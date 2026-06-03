import os
import asyncio
from playwright.async_api import async_playwright
from app.processor import draw_click, generate_guide_markdown

MAX_CONCURRENT_SESSIONS = asyncio.Semaphore(5)


async def auto_explore(page, out_dir: str, session_id: str):
    """Navega automaticamente clicando em elementos interativos da página."""

    await page.wait_for_load_state('networkidle')
    await asyncio.sleep(1.5)

    step = 0
    steps_data = []  # Coleção de dados de passos para sidebar e guia
    prev_click = None  # Coordenadas do clique anterior para setas

    # --- Screenshot inicial ---
    step += 1
    path = f"{out_dir}/step_{step:03d}.png"
    await page.screenshot(path=path, full_page=True)
    initial_text = "🏠 PÁGINA INICIAL"
    steps_data.append({'step': step, 'text': initial_text, 'tag': 'page', 'screenshot': f'step_{step:03d}.png'})
    await draw_click(path, 640, 60, None, step, initial_text, steps_data, 0)
    print(f"[{session_id}] Passo {step}: Página inicial")

    # Estratégias de exploração em camadas
    strategies = [
        {
            'name': 'Navegação principal',
            'selector': (
                'nav a:visible, '
                'aside a:visible, '
                '[class*="sidebar"] a:visible, '
                '[class*="menu"] a:visible, '
                '[class*="nav"] a:visible'
            ),
            'limit': 8,
        },
        {
            'name': 'Abas / Tabs',
            'selector': (
                '[role="tab"]:visible, '
                '[class*="tab"]:visible:not([class*="panel"]):not([class*="content"])'
            ),
            'limit': 5,
        },
        {
            'name': 'Botões de ação',
            'selector': (
                'button:visible:not([aria-label*="fechar"]):not([aria-label*="close"])'
                ':not([class*="theme"]):not([class*="dark"]):not([class*="mode"])'
            ),
            'limit': 6,
        },
        {
            'name': 'Links relevantes',
            'selector': (
                'a[href]:visible:not([href^="#"]):not([class*="theme"]):not([class*="mode"])'
            ),
            'limit': 5,
        },
        {
            'name': 'Campos de formulário',
            'selector': (
                'input[type="text"]:visible, '
                'input[type="search"]:visible, '
                'input[type="email"]:visible, '
                'select:visible'
            ),
            'limit': 3,
        },
    ]

    for strategy in strategies:
        try:
            elements = await page.query_selector_all(strategy['selector'])
            if not elements:
                continue

            print(f"  [{session_id}] 🔍 {strategy['name']}: {len(elements)} elementos")

            count = 0
            for el in elements:
                if count >= strategy['limit']:
                    break
                try:
                    if not await el.is_visible():
                        continue

                    box = await el.bounding_box()
                    if not box or box['width'] < 5 or box['height'] < 5:
                        continue

                    tag = await el.evaluate("el => el.tagName")
                    text = await el.inner_text()
                    text = text.strip()[:45] if text else ""

                    # Rola até o elemento
                    await el.scroll_into_view_if_needed()
                    await asyncio.sleep(0.4)

                    # Clica no centro do elemento
                    cx = box['x'] + box['width'] / 2
                    cy = box['y'] + box['height'] / 2
                    await page.mouse.click(cx, cy)
                    await asyncio.sleep(0.7)

                    # Aguarda a página estabilizar
                    try:
                        await page.wait_for_load_state('networkidle', timeout=5000)
                    except:
                        pass
                    await asyncio.sleep(0.4)

                    # Screenshot pós-clique (full page para coordenadas corretas)
                    step += 1
                    path = f"{out_dir}/step_{step:03d}.png"
                    await page.screenshot(path=path, full_page=True)

                    rect = {'x': box['x'], 'y': box['y'], 'width': box['width'], 'height': box['height']}
                    label = f"{tag}: {text}" if text else tag
                    steps_data.append({'step': step, 'text': label, 'tag': tag, 'screenshot': f'step_{step:03d}.png'})

                    # Passa steps_data atualizado e previous_click para setas
                    await draw_click(path, cx, cy, rect, step, label,
                                     steps_data, 0, None, prev_click)
                    prev_click = (cx, cy)
                    print(f"  [{session_id}]   ✅ Passo {step}: {tag} - '{text}'")

                    count += 1

                except Exception as e:
                    print(f"  [{session_id}]   ⚠️ Erro: {str(e)[:80]}")
                    continue

        except Exception as e:
            print(f"  [{session_id}] ⚠️ Estratégia '{strategy['name']}' falhou: {str(e)[:80]}")

    # --- Screenshot final ---
    step += 1
    path = f"{out_dir}/step_{step:03d}.png"
    await page.screenshot(path=path, full_page=True)
    final_text = "🏁 EXPLORAÇÃO CONCLUÍDA"
    steps_data.append({'step': step, 'text': final_text, 'tag': 'finish', 'screenshot': f'step_{step:03d}.png'})
    await draw_click(path, 640, 60, None, step, final_text, steps_data, step, None, prev_click)
    print(f"[{session_id}] 🏁 Exploração concluída! {step} passos gerados.")

    # ═══ Gerar guia markdown (estilo Dubble export) ═══
    try:
        page_url = page.url
        page_title = await page.title()
        guide_path = generate_guide_markdown(out_dir, session_id, steps_data, page_url, page_title)
        print(f"[{session_id}] 📘 Guia gerado: {guide_path}")
    except Exception as e:
        print(f"[{session_id}] ⚠️ Erro ao gerar guia: {str(e)[:80]}")

    return steps_data


async def run_session(url: str, session_id: str, auto: bool = True):
    async with MAX_CONCURRENT_SESSIONS, async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=['--no-sandbox', '--disable-setuid-sandbox']
        )
        ctx = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
            locale='pt-BR',
        )
        page = await ctx.new_page()

        out_dir = f"output/{session_id}"
        os.makedirs(out_dir, exist_ok=True)
        step = 0
        steps_data = []  # Para modo manual
        prev_click = None

        # Callback para modo manual (cliques do usuário)
        async def on_action(source, data):
            nonlocal step, prev_click
            step += 1
            path = f"{out_dir}/step_{step:03d}.png"
            await page.screenshot(path=path, full_page=True)
            rect = data.get('element', {}).get('rect', None)
            text = data.get('element', {}).get('text', '')
            tag = data.get('element', {}).get('tag', '')
            steps_data.append({'step': step, 'text': text, 'tag': tag, 'screenshot': f'step_{step:03d}.png'})
            await draw_click(path, data['x'], data['y'], rect, step, text, steps_data, 0, None, prev_click)
            prev_click = (data['x'], data['y'])
            print(f"[{session_id}] Passo {step}: {tag} - '{text}'")

        await ctx.expose_binding("onUserAction", on_action)
        with open("app/static/tracker.js", "r") as f:
            await ctx.add_init_script(f.read())

        # Retry em caso de erro de rede
        for attempt in range(3):
            try:
                await page.goto(url, wait_until='networkidle', timeout=30000)
                break
            except Exception as e:
                print(f"[{session_id}] ⚠️ Tentativa {attempt+1}/3 falhou: {str(e)[:100]}")
                if attempt == 2:
                    raise
                await asyncio.sleep(2)

        if auto:
            await auto_explore(page, out_dir, session_id)
        else:
            print(f"[{session_id}] Modo manual ativo. Clique na janela do navegador.")
            for _ in range(1800):  # Timeout 30 min
                if not browser.is_connected():
                    break
                await asyncio.sleep(1)

            # Gerar guia ao final do modo manual
            if steps_data:
                try:
                    page_url = page.url
                    page_title = await page.title()
                    guide_path = generate_guide_markdown(out_dir, session_id, steps_data, page_url, page_title)
                    print(f"[{session_id}] 📘 Guia gerado: {guide_path}")
                except Exception as e:
                    print(f"[{session_id}] ⚠️ Erro ao gerar guia: {str(e)[:80]}")

        await browser.close()
