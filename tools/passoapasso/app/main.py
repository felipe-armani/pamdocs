import uuid
import os
import glob
from fastapi import FastAPI, BackgroundTasks, Query, HTTPException
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse
from app.browser import run_session

app = FastAPI(title="Passo a Passo — Documentação Automatizada")

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "output")


# ═══════════════════════════════════════════════════════════
# Página inicial — Interface HTML
# ═══════════════════════════════════════════════════════════
@app.get("/", response_class=HTMLResponse)
async def index():
    """Interface principal do Passo a Passo."""
    # Coleta sessões existentes para exibir na tabela
    sessions_rows = ""
    if os.path.isdir(OUTPUT_DIR):
        for session_id in sorted(os.listdir(OUTPUT_DIR), reverse=True):
            session_path = os.path.join(OUTPUT_DIR, session_id)
            if os.path.isdir(session_path):
                screenshots = len(glob.glob(os.path.join(session_path, "step_*.png")))
                guide_path = os.path.join(session_path, f"GUIA_{session_id}.md")
                has_guide = os.path.exists(guide_path)
                guide_link = f'<a href="/guide/{session_id}" class="link">📘 Ver guia</a>' if has_guide else '<span class="muted">—</span>'
                sessions_rows += f"""
                <tr>
                    <td><code>{session_id}</code></td>
                    <td>{screenshots}</td>
                    <td>{guide_link}</td>
                    <td><a href="/session/{session_id}" class="link">🔍 Ver passos</a></td>
                </tr>"""

    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Passo a Passo — Documentação Automatizada</title>
    <style>
        :root {{
            --bg: #0f172a; --card: #1e293b; --border: #334155;
            --text: #e2e8f0; --muted: #94a3b8; --accent: #38bdf8;
            --green: #10b981; --red: #ef4444; --yellow: #f59e0b;
            --radius: 16px;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--bg); color: var(--text); min-height: 100vh; }}
        .container {{ max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }}

        /* Header */
        .hero {{ text-align: center; padding: 3rem 0 2rem; }}
        .hero h1 {{ font-size: 2.25rem; font-weight: 800; letter-spacing: -0.5px; }}
        .hero h1 span {{ background: linear-gradient(135deg, #38bdf8, #818cf8);
                         -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        .hero p {{ color: var(--muted); margin-top: 0.5rem; font-size: 1.05rem; }}

        /* Card */
        .card {{ background: var(--card); border: 1px solid var(--border);
                 border-radius: var(--radius); padding: 1.75rem; margin-bottom: 1.5rem; }}
        .card h2 {{ font-size: 1.2rem; font-weight: 600; margin-bottom: 1.25rem;
                    display: flex; align-items: center; gap: 0.5rem; }}

        /* Form */
        .form-row {{ display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: flex-end; }}
        .form-group {{ display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 200px; }}
        .form-group label {{ font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }}
        .form-group input, .form-group select {{
            background: var(--bg); border: 1px solid var(--border); border-radius: 10px;
            padding: 0.7rem 0.9rem; color: var(--text); font-size: 0.95rem;
            outline: none; transition: border-color 0.2s;
        }}
        .form-group input:focus, .form-group select:focus {{ border-color: var(--accent); }}

        /* Buttons */
        .btn {{
            padding: 0.7rem 1.5rem; border-radius: 10px; font-weight: 600; font-size: 0.95rem;
            border: none; cursor: pointer; transition: all 0.2s; white-space: nowrap;
            display: inline-flex; align-items: center; gap: 0.4rem;
        }}
        .btn-primary {{ background: linear-gradient(135deg, #38bdf8, #6366f1); color: white; }}
        .btn-primary:hover {{ opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(56,189,248,0.3); }}
        .btn-outline {{ background: transparent; border: 1px solid var(--border); color: var(--text); }}
        .btn-outline:hover {{ border-color: var(--accent); }}
        .btn-sm {{ padding: 0.4rem 0.9rem; font-size: 0.8rem; border-radius: 8px; }}

        /* Status */
        .status {{ display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.7rem;
                   border-radius: 20px; font-size: 0.8rem; font-weight: 600; }}
        .status-running {{ background: #064e3b33; color: var(--green); border: 1px solid #064e3b66; }}
        .status-done {{ background: #1e293b; color: var(--muted); border: 1px solid var(--border); }}

        /* Table */
        table {{ width: 100%; border-collapse: collapse; }}
        th {{ text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;
              color: var(--muted); padding: 0.6rem 0.75rem; border-bottom: 1px solid var(--border); }}
        td {{ padding: 0.7rem 0.75rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }}
        tr:hover td {{ background: rgba(255,255,255,0.02); }}

        .link {{ color: var(--accent); text-decoration: none; font-weight: 500; }}
        .link:hover {{ text-decoration: underline; }}
        .muted {{ color: var(--muted); font-size: 0.85rem; }}
        code {{ background: var(--bg); padding: 0.15rem 0.4rem; border-radius: 5px; font-size: 0.85rem; }}

        /* Toast */
        #toast {{ position: fixed; bottom: 1.5rem; right: 1.5rem; padding: 1rem 1.5rem;
                  border-radius: 12px; font-weight: 600; font-size: 0.9rem; z-index: 100;
                  opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none; }}
        #toast.show {{ opacity: 1; transform: translateY(0); }}
        #toast.success {{ background: #065f46; color: #d1fae5; border: 1px solid #10b981; }}
        #toast.error {{ background: #7f1d1d; color: #fee2e2; border: 1px solid #ef4444; }}

        /* Loading pulse */
        @keyframes pulse {{ 0%,100%{{opacity:1}} 50%{{opacity:0.5}} }}
        .pulse {{ animation: pulse 1.5s ease-in-out infinite; }}

        /* Empty state */
        .empty {{ text-align: center; padding: 2rem; color: var(--muted); }}

        /* Responsive */
        @media (max-width: 640px) {{
            .hero h1 {{ font-size: 1.5rem; }}
            .form-row {{ flex-direction: column; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <!-- Hero -->
        <div class="hero">
            <h1>🎬 <span>Passo a Passo</span></h1>
            <p>Documentação automatizada de páginas web — estilo Dubble</p>
        </div>

        <!-- Card: Nova captura -->
        <div class="card">
            <h2>🚀 Iniciar nova captura</h2>
            <div class="form-row">
                <div class="form-group" style="flex:3">
                    <label>URL do sistema</label>
                    <input type="url" id="urlInput" value="http://localhost:8005/dashboard"
                           placeholder="https://exemplo.com/pagina">
                </div>
                <div class="form-group" style="flex:1;min-width:140px">
                    <label>Modo</label>
                    <select id="modeSelect">
                        <option value="true">🤖 Automático</option>
                        <option value="false">🖱️ Manual (cliques)</option>
                    </select>
                </div>
                <div class="form-group" style="flex:0">
                    <label>&nbsp;</label>
                    <button class="btn btn-primary" onclick="startCapture()" id="startBtn">
                        ▶️ Iniciar
                    </button>
                </div>
            </div>
            <div id="captureStatus" style="margin-top:1rem"></div>
        </div>

        <!-- Card: Sessões -->
        <div class="card">
            <h2>📋 Sessões realizadas</h2>
            <div style="overflow-x:auto">
                <table>
                    <thead>
                        <tr><th>Sessão</th><th>Passos</th><th>Guia</th><th>Ações</th></tr>
                    </thead>
                    <tbody id="sessionsBody">
                        {sessions_rows if sessions_rows else '<tr><td colspan="4" class="empty">Nenhuma sessão ainda. Inicie sua primeira captura! 🚀</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Toast de notificação -->
    <div id="toast"></div>

    <script>
        async function startCapture() {{
            const url = document.getElementById('urlInput').value.trim();
            const auto = document.getElementById('modeSelect').value;
            const btn = document.getElementById('startBtn');
            const status = document.getElementById('captureStatus');

            if (!url) {{ showToast('Informe uma URL válida', 'error'); return; }}

            btn.disabled = true;
            btn.innerHTML = '⏳ Iniciando...';
            status.innerHTML = '<span class="status status-running pulse">🔴 Capturando...</span>';

            try {{
                const resp = await fetch(`/start?url=${{encodeURIComponent(url)}}&auto=${{auto}}`, {{
                    method: 'POST'
                }});
                const data = await resp.json();

                if (resp.ok) {{
                    showToast(`✅ Sessão ${{data.session_id}} iniciada! Modo: ${{data.auto ? 'automático' : 'manual'}}`, 'success');
                    status.innerHTML = `<span class="status status-running">🟢 Sessão <code>${{data.session_id}}</code> em andamento...</span>
                    <p class="muted" style="margin-top:0.5rem">As screenshots aparecerão na tabela abaixo quando a captura terminar. <a href="/session/${{data.session_id}}" class="link">Acompanhar passos →</a></p>`;
                }} else {{
                    showToast('❌ Erro: ' + (data.detail || 'Falha ao iniciar'), 'error');
                    status.innerHTML = '';
                }}
            }} catch(e) {{
                showToast('❌ Erro de conexão: ' + e.message, 'error');
                status.innerHTML = '';
            }} finally {{
                btn.disabled = false;
                btn.innerHTML = '▶️ Iniciar';
            }}
        }}

        function showToast(msg, type) {{
            const toast = document.getElementById('toast');
            toast.textContent = msg;
            toast.className = type;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }}

        // Atualizar tabela a cada 10s
        setInterval(async () => {{
            try {{
                const resp = await fetch('/sessions');
                const data = await resp.json();
                const tbody = document.getElementById('sessionsBody');
                if (data.sessions.length === 0) {{
                    tbody.innerHTML = '<tr><td colspan="4" class="empty">Nenhuma sessão ainda. Inicie sua primeira captura! 🚀</td></tr>';
                    return;
                }}
                tbody.innerHTML = data.sessions.reverse().map(s => `
                    <tr>
                        <td><code>${{s.session_id}}</code></td>
                        <td>${{s.screenshots}}</td>
                        <td>${{s.has_guide ? `<a href="/guide/${{s.session_id}}" class="link">📘 Ver guia</a>` : '<span class="muted">—</span>'}}</td>
                        <td><a href="/session/${{s.session_id}}" class="link">🔍 Ver passos</a></td>
                    </tr>
                `).join('');
            }} catch(e) {{ /* silencioso */ }}
        }}, 10000);

        // Enter no campo URL também inicia
        document.getElementById('urlInput').addEventListener('keydown', e => {{
            if (e.key === 'Enter') startCapture();
        }});
    </script>
</body>
</html>"""
    return HTMLResponse(content=html)


@app.post("/start")
async def start(
    url: str,
    bg: BackgroundTasks,
    auto: bool = Query(default=True, description="Modo automático (True) ou manual (False)"),
):
    """Inicia uma sessão de captura de passos."""
    uid = str(uuid.uuid4())[:8]
    bg.add_task(run_session, url, uid, auto)
    return {"status": "started", "session_id": uid, "auto": auto}


@app.get("/sessions")
async def list_sessions():
    """Lista todas as sessões de captura."""
    sessions = []
    if os.path.isdir(OUTPUT_DIR):
        for session_id in sorted(os.listdir(OUTPUT_DIR)):
            session_path = os.path.join(OUTPUT_DIR, session_id)
            if os.path.isdir(session_path):
                screenshots = sorted(glob.glob(os.path.join(session_path, "step_*.png")))
                guide_path = os.path.join(session_path, f"GUIA_{session_id}.md")
                sessions.append({
                    "session_id": session_id,
                    "screenshots": len(screenshots),
                    "has_guide": os.path.exists(guide_path),
                    "guide_url": f"/guide/{session_id}" if os.path.exists(guide_path) else None,
                })
    return {"sessions": sessions}


@app.get("/session/{session_id}")
async def get_session(session_id: str):
    """Retorna detalhes de uma sessão específica."""
    session_path = os.path.join(OUTPUT_DIR, session_id)
    if not os.path.isdir(session_path):
        raise HTTPException(status_code=404, detail="Sessão não encontrada")

    screenshots = sorted(glob.glob(os.path.join(session_path, "step_*.png")))
    guide_path = os.path.join(session_path, f"GUIA_{session_id}.md")

    return {
        "session_id": session_id,
        "screenshots": [os.path.basename(s) for s in screenshots],
        "screenshot_urls": [f"/screenshot/{session_id}/{os.path.basename(s)}" for s in screenshots],
        "has_guide": os.path.exists(guide_path),
        "guide_url": f"/guide/{session_id}" if os.path.exists(guide_path) else None,
    }


@app.get("/screenshot/{session_id}/{filename}")
async def get_screenshot(session_id: str, filename: str):
    """Serve uma screenshot específica."""
    file_path = os.path.join(OUTPUT_DIR, session_id, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Screenshot não encontrada")
    return FileResponse(file_path, media_type="image/png")


@app.get("/guide/{session_id}")
async def get_guide(session_id: str):
    """Serve o guia markdown gerado como HTML."""
    guide_path = os.path.join(OUTPUT_DIR, session_id, f"GUIA_{session_id}.md")
    if not os.path.exists(guide_path):
        raise HTTPException(status_code=404, detail="Guia não encontrado. Execute uma sessão primeiro.")

    with open(guide_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # HTML simples para visualizar o guia
    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guia — Sessão {session_id}</title>
    <style>
        :root {{
            --bg: #f8f9fa; --card-bg: #ffffff; --text: #1a1a2e;
            --border: #e2e8f0; --accent: #0ea5e9; --muted: #64748b;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: var(--bg); color: var(--text); line-height: 1.6; }}
        .container {{ max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }}
        .header {{ background: linear-gradient(135deg, #0ea5e9, #6366f1);
                   color: white; padding: 2rem 1.5rem; text-align: center; border-radius: 0 0 24px 24px; }}
        .header h1 {{ font-size: 1.75rem; font-weight: 700; }}
        .header p {{ opacity: 0.9; font-size: 0.9rem; margin-top: 0.5rem; }}
        .step-card {{ background: var(--card-bg); border: 1px solid var(--border);
                      border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.05); }}
        .step-card h3 {{ font-size: 1.1rem; color: var(--accent); margin-bottom: 0.75rem;
                         display: flex; align-items: center; gap: 0.5rem; }}
        .step-card .badge {{ background: #10b981; color: white; border-radius: 50%;
                              width: 28px; height: 28px; display: inline-flex;
                              align-items: center; justify-content: center; font-size: 0.8rem;
                              font-weight: 700; flex-shrink: 0; }}
        .step-card img {{ max-width: 100%; border-radius: 8px; border: 1px solid var(--border);
                          margin: 0.75rem 0; }}
        .step-card table {{ width: 100%; border-collapse: collapse; margin: 0.75rem 0; }}
        .step-card td {{ padding: 0.4rem 0.5rem; border-bottom: 1px solid var(--border);
                         font-size: 0.85rem; }}
        .step-card td:first-child {{ font-weight: 600; color: var(--muted); width: 120px; }}
        .step-card blockquote {{ background: #f0fdf4; border-left: 3px solid #10b981;
                                 padding: 0.75rem 1rem; border-radius: 0 8px 8px 0;
                                 font-size: 0.85rem; color: #166534; margin-top: 0.75rem; }}
        .footer {{ text-align: center; padding: 2rem; color: var(--muted); font-size: 0.85rem; }}
        .back-link {{ color: var(--accent); text-decoration: none; font-weight: 500; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>📘 Guia Passo a Passo</h1>
        <p>Sessão: <code>{session_id}</code></p>
    </div>
    <div class="container">
        <p><a href="/sessions" class="back-link">← Voltar para lista de sessões</a></p>
        <pre style="white-space: pre-wrap; font-family: inherit; background: var(--card-bg);
                    border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;
                    margin-top: 1rem; font-size: 0.9rem;">{content}</pre>
    </div>
    <div class="footer">
        <p>Gerado automaticamente pelo sistema <strong>Passo a Passo</strong></p>
    </div>
</body>
</html>"""
    return HTMLResponse(content=html)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "passoapasso"}
