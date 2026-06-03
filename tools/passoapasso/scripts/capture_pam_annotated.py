"""
Captura as 12 telas do PAM com anotações sutis de navegação.
Mostra onde clicar no menu lateral para acessar cada módulo.
"""
import asyncio
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app.processor import _draw

from playwright.async_api import async_playwright

PAM_URL = "http://localhost:8005"
EMAIL = "admin@example.com"
PASSWORD = "Admin@123"
# Caminho relativo ao assets do pamdocs (4 dirname: scripts/ → passoapasso/ → tools/ → raiz/)
OUTPUT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "src", "assets")

# Cada entrada: (arquivo, url, (x_clique, y_clique), texto_label)
PAGES = [
    ("01-login.png",        "/",                (400, 380),  "Tela de autenticacao"),
    ("02-dashboard.png",    "/dashboard",       (180, 200),  "Dashboard — Visao Geral"),
    ("03-usuarios.png",     "/users",           (180, 460),  "Menu: Usuarios"),
    ("04-projetos.png",     "/projects",        (180, 420),  "Menu: Projetos"),
    ("05-grupos.png",       "/groups",          (180, 260),  "Menu: Grupos"),
    ("06-pessoas.png",      "/people",          (180, 300),  "Menu: Pessoas"),
    ("07-dominios.png",     "/domains",         (180, 500),  "Menu: Dominios"),
    ("08-hubs.png",         "/config/hubs",     (180, 540),  "Menu: Hubs"),
    ("09-integracoes.png",  "/config/integrations", (180, 580), "Menu: Integracoes"),
    ("10-scheduler.png",    "/config/scheduler",    (180, 340), "Menu: Scheduler"),
    ("11-logs.png",         "/config/logs",         (180, 660), "Menu: Logs"),
    ("12-status.png",       "/config/status",       (180, 620), "Menu: Status"),
]

async def login(page):
    print("🔐 Fazendo login...")
    await page.goto(PAM_URL, wait_until="networkidle")
    await page.wait_for_timeout(800)
    await page.fill('input[type="email"], input[name="email"]', EMAIL)
    await page.fill('input[type="password"], input[name="password"]', PASSWORD)
    await page.click('button[type="submit"], button:has-text("Entrar")')
    await page.wait_for_timeout(2000)
    await page.wait_for_load_state("networkidle")
    return page.url

async def capture_all():
    os.makedirs(OUTPUT, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        ctx = await browser.new_context(viewport={'width': 1920, 'height': 1080}, locale='pt-BR', device_scale_factor=2)
        page = await ctx.new_page()

        await login(page)

        for filename, route, (cx, cy), label in PAGES:
            url = f"{PAM_URL}{route}"
            print(f"📸 {filename} ← {url}")
            try:
                await page.goto(url, wait_until="networkidle", timeout=15000)
                await page.wait_for_timeout(1000)
            except:
                pass

            tmp = f"/tmp/pam_{filename}"
            await page.screenshot(path=tmp, full_page=True, type='png')

            # Anotação sutil: badge numerado + highlight no ponto de clique
            step_num = int(filename.split("-")[0])
            steps = [{'step': i+1, 'text': p[3]} for i, p in enumerate(PAGES)]
            _draw(tmp, cx, cy, None, step_num, label, steps, len(PAGES))

            final = os.path.join(OUTPUT, filename)
            os.rename(tmp, final)
            size = os.path.getsize(final) / 1024
            print(f"   ✅ {size:.0f} KB")

        await browser.close()
        print("🏁 Todas as 12 telas capturadas!")

if __name__ == "__main__":
    asyncio.run(capture_all())
