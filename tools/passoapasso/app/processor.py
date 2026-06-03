import cv2
import numpy as np
import asyncio
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=4)

# ═══════════════════════════════════════════════════════════
# Cores — vermelho + azul, chamativo mas equilibrado
# ═══════════════════════════════════════════════════════════
ACCENT = (150, 70, 190)       # Vermelho-azulado (destaque)
ACCENT_SOFT = (175, 130, 210) # Lilás suave (fundo/borda)
WARN = (90, 50, 200)          # Tom mais quente para alerta
WHITE = (255, 255, 255)
BLACK = (28, 28, 34)
DARK_BG = (32, 32, 40)
SIDEBAR_BG = (250, 250, 253)
SIDEBAR_BORDER = (216, 216, 226)
GRAY_MUTED = (148, 148, 158)
GREEN = (70, 160, 80)
LABEL_BG = (195, 210, 250)    # Azul claríssimo para labels


def _drop_shadow(img, x, y, w, h, blur=9, offset=3):
    """Desenha sombra projetada para dar profundidade."""
    x, y, w, h = int(x), int(y), int(w), int(h)
    h_img, w_img = img.shape[:2]
    x = max(0, x); y = max(0, y)
    w = min(w, w_img - x); h = min(h, h_img - y)
    if w <= 0 or h <= 0: return
    if blur % 2 == 0: blur += 1  # kernel must be odd
    shadow = np.zeros((h_img, w_img), dtype=np.uint8)
    cv2.rectangle(shadow, (x+offset, y+offset), (x+w+offset, y+h+offset), 255, -1)
    shadow = cv2.GaussianBlur(shadow, (blur, blur), blur//2)
    for c in range(3):
        img[shadow > 0, c] = (img[shadow > 0, c] * 0.45).astype(np.uint8)


def _draw_mouse_cursor(img, cx, cy, scale=1.0):
    """Desenha ícone de cursor do mouse na posição do clique."""
    cx, cy = int(cx), int(cy)
    s = int(20 * scale)
    pts = np.array([
        [cx, cy],
        [cx + int(6*s/14), cy + int(11*s/14)],
        [cx + int(3*s/14), cy + int(11*s/14)],
        [cx + int(3*s/14), cy + int(20*s/14)],
        [cx - int(3*s/14), cy + int(14*s/14)],
    ], dtype=np.int32)
    cv2.fillPoly(img, [pts + (2,2)], BLACK, cv2.LINE_AA)
    cv2.fillPoly(img, [pts], WHITE, cv2.LINE_AA)
    cv2.polylines(img, [pts], True, BLACK, 2, cv2.LINE_AA)


def _draw_element_highlight(img, rect, w):
    """Destaca o elemento com borda dupla vermelha/amarela."""
    rx = int(rect.get('x', 0)); ry = int(rect.get('y', 0))
    rw = int(rect.get('width', 0)); rh = int(rect.get('height', 0))
    if rw < 5 or rh < 5: return
    pad = 7
    x1 = max(0, rx - pad); y1 = max(0, ry - pad)
    x2 = min(w, rx + rw + pad); y2 = min(img.shape[0], ry + rh + pad)
    # Preenchimento amarelo semi-transparente
    sub = img[y1:y2, x1:x2].copy()
    sub[:] = (sub * 0.60 + np.array([120, 100, 210]) * 0.40).astype(np.uint8)
    img[y1:y2, x1:x2] = sub
    # Borda dupla vermelho-azulada
    cv2.rectangle(img, (x1, y1), (x2, y2), ACCENT, 2, cv2.LINE_AA)
    cv2.rectangle(img, (x1-1, y1-1), (x2+1, y2+1), ACCENT_SOFT, 1, cv2.LINE_AA)


def _draw_arrow(img, fx, fy, tx, ty, color, thickness=3):
    """Seta grossa entre dois pontos."""
    fx, fy, tx, ty = int(fx), int(fy), int(tx), int(ty)
    cv2.arrowedLine(img, (fx+1, fy+1), (tx+1, ty+1), BLACK, thickness, cv2.LINE_AA, tipLength=0.12)
    cv2.arrowedLine(img, (fx, fy), (tx, ty), color, thickness, cv2.LINE_AA, tipLength=0.12)


def _draw_banner(img, step_num, text, total_steps, h, w):
    """Banner chamativo no topo com instrução do passo."""
    banner_h = 62
    for i in range(banner_h):
        alpha = 0.88 - (i / banner_h) * 0.35
        img[i, :] = (img[i, :] * (1-alpha) + np.array([int(15*alpha), int(5*alpha), int(160*alpha)]) * alpha).astype(np.uint8)
    # Linha inferior amarela
    cv2.line(img, (0, banner_h), (w, banner_h), ACCENT_SOFT, 2, cv2.LINE_AA)
    # Texto
    cv2.putText(img, f"PASSO {step_num}/{total_steps}", (14, 27),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, ACCENT_SOFT, 1, cv2.LINE_AA)
    cv2.putText(img, text[:62], (14, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, WHITE, 1, cv2.LINE_AA)
    # Badge no canto direito
    bx = w - 42; by = banner_h // 2
    cv2.circle(img, (bx, by), 18, WHITE, -1, cv2.LINE_AA)
    cv2.circle(img, (bx, by), 16, ACCENT, -1, cv2.LINE_AA)
    n = str(step_num)
    (tw, th), _ = cv2.getTextSize(n, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
    cv2.putText(img, n, (bx - tw//2, by + th//2),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, WHITE, 1, cv2.LINE_AA)


def _draw_click_indicator(img, cx, cy, step_num, show_mouse=True):
    """Indicador de clique — mouse cursor + anéis coloridos + badge."""
    cx, cy = int(cx), int(cy)
    # Anel externo sutil (30px)
    cv2.circle(img, (cx, cy), 30, ACCENT_SOFT, 2, cv2.LINE_AA)
    # Círculo central
    cv2.circle(img, (cx+1, cy+1), 14, BLACK, -1, cv2.LINE_AA)
    cv2.circle(img, (cx, cy), 14, ACCENT, -1, cv2.LINE_AA)
    cv2.circle(img, (cx, cy), 14, WHITE, 1, cv2.LINE_AA)
    # Ícone do mouse
    if show_mouse:
        _draw_mouse_cursor(img, cx, cy, 1.1)
    # Badge numerado
    bx, by = cx + 26, cy - 26
    cv2.circle(img, (bx+1, by+1), 14, BLACK, -1, cv2.LINE_AA)
    cv2.circle(img, (bx, by), 14, ACCENT_SOFT, -1, cv2.LINE_AA)
    cv2.circle(img, (bx, by), 14, BLACK, 1, cv2.LINE_AA)
    n = str(step_num)
    (tw, th), _ = cv2.getTextSize(n, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
    cv2.putText(img, n, (bx - tw//2, by + th//2),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, BLACK, 1, cv2.LINE_AA)


def _draw_instruction_label(img, rect, x, y, step_num, text, h):
    """Label de instrução amarelo chamativo abaixo do elemento."""
    lx = int(rect.get('x', x)) if rect else int(x)
    ly = int(rect.get('y', 0) + rect.get('height', 0)) + 38 if rect else int(y) + 50
    ly = min(ly, h - 16)
    display = f"▶ PASSO {step_num}: {text}"[:62]
    font = cv2.FONT_HERSHEY_SIMPLEX; scale = 0.5
    (tw, th), baseline = cv2.getTextSize(display, font, scale, 2)
    pad = 10
    x1, y1 = max(0, lx-pad), ly - th - pad
    x2, y2 = min(img.shape[1]-1, lx+tw+pad), ly + baseline + pad
    _drop_shadow(img, x1, y1, x2-x1, y2-y1, blur=9, offset=2)
    cv2.rectangle(img, (x1, y1), (x2, y2), LABEL_BG, -1)
    cv2.rectangle(img, (x1, y1), (x2, y2), ACCENT, 2, cv2.LINE_AA)
    cv2.putText(img, display, (lx, ly), font, scale, BLACK, 1, cv2.LINE_AA)


def _draw_sidebar(img, steps_data, current_step, total_steps):
    """Sidebar com indicador de progresso e status dos passos."""
    h, w = img.shape[:2]
    sw = min(255, w // 3)
    cv2.rectangle(img, (0, 0), (sw, h), SIDEBAR_BG, -1)
    cv2.line(img, (sw, 0), (sw, h), SIDEBAR_BORDER, 1)
    # Cabeçalho escuro
    cv2.rectangle(img, (0, 0), (sw, 52), BLACK, -1)
    cv2.putText(img, "PASSO A PASSO", (12, 34), cv2.FONT_HERSHEY_SIMPLEX, 0.6, WHITE, 1, cv2.LINE_AA)
    # Barra de progresso
    cv2.rectangle(img, (10, 58), (sw-10, 64), SIDEBAR_BORDER, -1)
    if total_steps > 0:
        pw = int((sw-20) * (current_step / total_steps))
        cv2.rectangle(img, (10, 58), (10+pw, 64), ACCENT, -1)
    # Lista de passos
    yo = 80
    for step in steps_data:
        sn = step.get('step', 0); st = step.get('text', f'Passo {sn}')[:25]
        is_current = (sn == current_step); done = sn < current_step
        dx, dy = 22, yo + 7
        if is_current:
            cv2.circle(img, (dx, dy), 12, ACCENT, -1, cv2.LINE_AA)
            cv2.circle(img, (dx, dy), 12, ACCENT_SOFT, 1, cv2.LINE_AA)
            n = str(sn)
            (nw, nh), _ = cv2.getTextSize(n, cv2.FONT_HERSHEY_SIMPLEX, 0.4, 1)
            cv2.putText(img, n, (dx-nw//2, dy+nh//2), cv2.FONT_HERSHEY_SIMPLEX, 0.4, WHITE, 1, cv2.LINE_AA)
        elif done:
            cv2.circle(img, (dx, dy), 10, GREEN, -1, cv2.LINE_AA)
            cv2.putText(img, "✓", (dx-7, dy+5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, WHITE, 1, cv2.LINE_AA)
        else:
            cv2.circle(img, (dx, dy), 10, WHITE, -1, cv2.LINE_AA)
            cv2.circle(img, (dx, dy), 10, SIDEBAR_BORDER, 1, cv2.LINE_AA)
            n = str(sn)
            (nw, nh), _ = cv2.getTextSize(n, cv2.FONT_HERSHEY_SIMPLEX, 0.35, 1)
            cv2.putText(img, n, (dx-nw//2, dy+nh//2), cv2.FONT_HERSHEY_SIMPLEX, 0.35, GRAY_MUTED, 1, cv2.LINE_AA)
        tc = BLACK if is_current else ((50, 50, 60) if not done else (70, 70, 80))
        cv2.putText(img, st, (44, dy+6), cv2.FONT_HERSHEY_SIMPLEX, 0.33, tc, 1, cv2.LINE_AA)
        yo += 32
        if yo > h - 40: break


# ═══════════════════════════════════════════════════════════
# Função principal
# ═══════════════════════════════════════════════════════════
def _draw(path: str, x: int, y: int, rect: dict = None, step_num: int = 1,
          element_text: str = "", all_steps: list = None, total_steps: int = 0,
          previous_click: tuple = None):
    img = cv2.imread(path)
    if img is None: return
    h, w = img.shape[:2]

    if total_steps > 0:
        _draw_banner(img, step_num, element_text or 'Elemento clicado', total_steps, h, w)
    if rect:
        _draw_element_highlight(img, rect, w)
    if previous_click and previous_click[0] > 0:
        _draw_arrow(img, previous_click[0], previous_click[1], x, y, ACCENT_SOFT, 2)
    _draw_click_indicator(img, x, y, step_num, show_mouse=True)
    if element_text:
        _draw_instruction_label(img, rect, x, y, step_num, element_text, h)
    if all_steps and len(all_steps) > 0:
        _draw_sidebar(img, all_steps, step_num, total_steps or len(all_steps))

    # Rodapé
    cv2.rectangle(img, (0, h-16), (w, h), BLACK, -1)
    cv2.putText(img, "PAM System · Documentacao automatizada",
                (10, h-3), cv2.FONT_HERSHEY_SIMPLEX, 0.3, WHITE, 1, cv2.LINE_AA)
    cv2.imwrite(path, img)


async def draw_click(path: str, x: int, y: int, rect: dict = None, step_num: int = 1,
                    element_text: str = "", all_steps: list = None, total_steps: int = 0,
                    redactions: list = None, previous_click: tuple = None):
    await asyncio.get_event_loop().run_in_executor(
        executor, _draw, path, x, y, rect, step_num, element_text,
        all_steps, total_steps, previous_click
    )


def generate_guide_markdown(out_dir: str, session_id: str, steps_data: list,
                            url: str, title: str = "Guia Passo a Passo") -> str:
    from datetime import datetime
    md_path = f"{out_dir}/GUIA_{session_id}.md"
    now = datetime.now().strftime("%d/%m/%Y %H:%M")
    lines = [f"# 📘 {title}", "", f"> **URL:** {url}",
             f"> **Sessão:** `{session_id}`", f"> **Gerado em:** {now}",
             f"> **Total de passos:** {len(steps_data)}", "", "---"]
    for i, step in enumerate(steps_data):
        sn = step.get('step', i+1); st = step.get('text', f'Passo {sn}')
        ss = step.get('screenshot', f'step_{sn:03d}.png')
        lines += ["", f"### ▶ Passo {sn}: {st}", "", f"![Passo {sn}]({ss})", "", "---"]
    lines += ["", "## 📊 Resumo", f"- **Total de passos:** {len(steps_data)}",
              f"- **Página:** {url}", "", f"*Gerado automaticamente — {now}*"]
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    return md_path
