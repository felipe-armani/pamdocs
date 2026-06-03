"""
Remove a sidebar de navegação dos screenshots do PAM.
Detecta automaticamente a borda direita da sidebar e recorta a imagem.
Processa tanto src/assets/ quanto tools/passoapasso/output/.
"""
import cv2
import numpy as np
import os
import sys
from pathlib import Path

# Raiz do projeto pamdocs (4 dirname a partir de tools/passoapasso/scripts/)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

ASSETS_DIR = os.path.join(PROJECT_ROOT, "src", "assets")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "tools", "passoapasso", "output")
BACKUP_DIR = os.path.join(PROJECT_ROOT, "tools", "passoapasso", "backup_sidebar")


def detect_sidebar_border(gray_img):
    """
    Detecta a borda direita da sidebar analisando mudanças de intensidade
    nas colunas da imagem.
    
    Retorna a coordenada X onde a sidebar termina, ou None se não detectar.
    """
    h, w = gray_img.shape
    
    # Média de intensidade por coluna
    col_means = np.mean(gray_img, axis=0)
    
    # Procura transições bruscas entre x=150 e x=800 (range seguro)
    search_start = 150
    search_end = min(800, w // 2)
    
    if search_end <= search_start:
        return None
    
    diff = np.abs(np.diff(col_means[search_start:search_end]))
    
    if len(diff) == 0:
        return None
    
    threshold = np.mean(diff) + 1.8 * np.std(diff)
    peaks = np.where(diff > threshold)[0] + search_start
    
    # Filtra picos na faixa esperada da borda da sidebar (400-650px em 2x)
    # A sidebar tem ~250px de largura (1x), ~500px em 2x Retina
    sidebar_peaks = [p for p in peaks if 400 < p < 650]
    
    if sidebar_peaks:
        # Pega o primeiro pico do grupo mais próximo de ~510 (borda conhecida)
        border = sidebar_peaks[0]
        # Ajuste fino: avança até a coluna onde a intensidade estabiliza
        # (após a linha de borda, que é mais escura)
        for offset in range(1, 15):
            check_x = border + offset
            if check_x < w and col_means[check_x] > col_means[border] + 10:
                border = check_x
                break
        return border + 1  # +1 para incluir a borda no corte
    
    return None


def remove_sidebar(image_path, output_path, sidebar_border=None):
    """
    Remove a sidebar de uma imagem, recortando a partir da borda detectada.
    Se sidebar_border for None, tenta detectar automaticamente.
    """
    img = cv2.imread(image_path)
    if img is None:
        print(f"  ❌ Erro ao ler: {image_path}")
        return False
    
    h, w = img.shape[:2]
    
    if sidebar_border is None:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        sidebar_border = detect_sidebar_border(gray)
    
    if sidebar_border is None or sidebar_border <= 0 or sidebar_border >= w * 0.6:
        # Sem sidebar detectada ou borda muito à direita — mantém original
        print(f"  ⚠️ Sidebar não detectada — copiando original")
        cv2.imwrite(output_path, img)
        return True
    
    # Recorta a imagem da borda da sidebar até a direita
    cropped = img[:, sidebar_border:]
    
    cv2.imwrite(output_path, cropped)
    new_w = cropped.shape[1]
    print(f"  ✅ Sidebar removida: x={sidebar_border} → nova largura: {w}→{new_w}px")
    return True


def process_directory(input_dir, output_dir, backup=True):
    """Processa todos os PNGs de um diretório."""
    if not os.path.isdir(input_dir):
        print(f"❌ Diretório não encontrado: {input_dir}")
        return
    
    png_files = sorted(Path(input_dir).rglob("*.png"))
    
    if not png_files:
        print(f"⚠️ Nenhum PNG encontrado em: {input_dir}")
        return
    
    print(f"\n{'='*60}")
    print(f"📁 {input_dir}")
    print(f"   {len(png_files)} arquivo(s) PNG encontrado(s)")
    print(f"{'='*60}")
    
    for png_path in png_files:
        rel_path = png_path.relative_to(input_dir)
        
        # Caminho de saída mantendo a estrutura
        out_path = os.path.join(output_dir, str(rel_path))
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        
        # Backup do original (se ainda não existe)
        if backup:
            backup_path = os.path.join(BACKUP_DIR, str(rel_path))
            if not os.path.exists(backup_path):
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                cv2.imwrite(backup_path, cv2.imread(str(png_path)))
        
        print(f"  {rel_path}")
        remove_sidebar(str(png_path), out_path)


def main():
    print("🧹 Removedor de Sidebar — PAM Screenshots")
    print(f"   Raiz do projeto: {PROJECT_ROOT}")
    
    # 1. Processa src/assets/ (sobrescreve os originais após backup)
    process_directory(ASSETS_DIR, ASSETS_DIR, backup=True)
    
    # 2. Processa output/ (do passoapasso)
    if os.path.isdir(OUTPUT_DIR):
        process_directory(OUTPUT_DIR, OUTPUT_DIR, backup=True)
    else:
        print(f"\n⚠️ Diretório output/ não encontrado: {OUTPUT_DIR}")
    
    print(f"\n{'='*60}")
    print(f"💾 Backups salvos em: {BACKUP_DIR}")
    print(f"🏁 Concluído!")


if __name__ == "__main__":
    main()
