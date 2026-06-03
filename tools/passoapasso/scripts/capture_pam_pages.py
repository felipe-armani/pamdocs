"""
Script para capturar screenshots autenticadas de cada página do PAM.
Faz login via SSO (PROFILE) e navega por todas as páginas.
"""
import asyncio
import os
from playwright.async_api import async_playwright

# Config
PAM_URL = "http://localhost:8005"
PROFILE_URL = "http://localhost:8007"
EMAIL = "admin@example.com"
PASSWORD = "Admin@123"
# Caminho relativo ao assets do pamdocs (4 dirname: scripts/ → passoapasso/ → tools/ → raiz/)
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "src", "assets")

PAGES = {
    "01-login.png":        f"{PAM_URL}/",
    "02-dashboard.png":    f"{PAM_URL}/dashboard",
    "03-usuarios.png":     f"{PAM_URL}/users",
    "04-projetos.png":     f"{PAM_URL}/projects",
    "05-grupos.png":       f"{PAM_URL}/groups",
    "06-pessoas.png":      f"{PAM_URL}/people",
    "07-dominios.png":     f"{PAM_URL}/domains",
    "08-hubs.png":         f"{PAM_URL}/config/hubs",
    "09-integracoes.png":  f"{PAM_URL}/config/integrations",
    "10-scheduler.png":    f"{PAM_URL}/config/scheduler",
    "11-logs.png":         f"{PAM_URL}/config/logs",
    "12-status.png":       f"{PAM_URL}/config/status",
}

async def login(page):
    """Faz login no PAM via formulário (SSO delega para PROFILE)."""
    print("🔐 Fazendo login...")
    await page.goto(PAM_URL, wait_until="networkidle")
    await page.wait_for_timeout(1000)

    # Preenche o formulário de login
    await page.fill('input[type="email"], input[name="email"]', EMAIL)
    await page.fill('input[type="password"], input[name="password"]', PASSWORD)

    # Clica no botão Entrar
    await page.click('button[type="submit"], button:has-text("Entrar")')
    await page.wait_for_timeout(2000)
    await page.wait_for_load_state("networkidle")
    print(f"   URL após login: {page.url}")
    return page.url

async def capture():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=['--no-sandbox'])
        ctx = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            locale='pt-BR',
            device_scale_factor=2,  # Retina quality
        )
        page = await ctx.new_page()

        # Login
        await login(page)

        # Captura cada página com qualidade máxima
        for filename, url in PAGES.items():
            print(f"📸 Capturando: {filename} ← {url}")
            try:
                await page.goto(url, wait_until="networkidle", timeout=15000)
                await page.wait_for_timeout(1200)  # Aguarda render completo
                path = os.path.join(OUTPUT_DIR, filename)
                await page.screenshot(path=path, full_page=True, type='png')
                # Verifica tamanho
                size_kb = os.path.getsize(path) / 1024
                print(f"   ✅ Salvo: {filename} ({size_kb:.0f} KB)")
            except Exception as e:
                print(f"   ⚠️ Erro: {str(e)[:80]}")
                try:
                    await page.screenshot(path=os.path.join(OUTPUT_DIR, filename), type='png')
                    print(f"   ✅ Salvo (fallback): {filename}")
                except:
                    print(f"   ❌ Falha total: {filename}")

        await browser.close()
        print("🏁 Captura concluída!")

if __name__ == "__main__":
    asyncio.run(capture())
