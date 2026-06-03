# 📋 MIGRAÇÃO — Consolidação `passoapasso` → `pamdocs`

> **Data:** 03/06/2026  
> **Autor:** Consolidado via GitHub Copilot  
> **Status:** ✅ Concluído  
> **Referência:** `/home/felipe-armani/Documents/Projetos/pamdocs`

---

## 1. Sumário Executivo

Esta migração consolida o projeto **passoapasso** (ferramenta Python de documentação automatizada com Playwright + OpenCV) dentro do projeto **pamdocs** (frontend TanStack Start de documentação operacional do sistema PAM), unificando os dois codebases em um único repositório.

A decisão de consolidar foi tomada porque:
- O `passoapasso` é uma ferramenta auxiliar que **existe exclusivamente para capturar telas do PAM** para o `pamdocs`
- Os scripts já geravam output para `pamdocs/src/assets/` com paths absolutos rígidos
- Ambos os projetos pertencem ao mesmo domínio funcional (documentação PAM)
- A consolidação simplifica manutenção, versionamento e onboarding

---

## 2. Estrutura Antes da Migração

```
/home/felipe-armani/Documents/Projetos/
├── pamdocs/                    ← Frontend TanStack Start (este projeto)
│   ├── src/
│   │   ├── assets/             ← 12 PNGs gerados pelo passoapasso
│   │   ├── components/         ← Componentes React + shadcn/ui
│   │   ├── routes/             ← Rotas de documentação
│   │   └── ...
│   ├── package.json            ← Bun/Node — React, Vite, Cloudflare
│   └── ...
│
└── passoapasso/                ← Ferramenta Python (projeto isolado)
    ├── app/
    │   ├── main.py             ← FastAPI — interface web
    │   ├── browser.py          ← Playwright — navegação automática
    │   ├── processor.py        ← OpenCV — anotação de imagens
    │   └── static/tracker.js   ← Script auxiliar
    ├── scripts/
    │   ├── capture_pam_annotated.py  ← Captura com anotações
    │   └── capture_pam_pages.py      ← Captura simples
    ├── docs/
    │   └── UPFRONT_PAM.md      ← Documentação de arquitetura PAM
    ├── requirements.txt        ← Python: fastapi, uvicorn, playwright, opencv
    ├── package.json            ← Node: playwright
    └── output/                 ← Sessões de captura geradas
```

---

## 3. Estrutura Após a Migração

```
/home/felipe-armani/Documents/Projetos/pamdocs/
├── tools/
│   └── passoapasso/                  ← Ferramenta consolidada aqui
│       ├── app/
│       │   ├── __init__.py
│       │   ├── main.py               ← FastAPI — interface web
│       │   ├── browser.py            ← Playwright — navegação automática
│       │   ├── processor.py          ← OpenCV — anotação de imagens
│       │   └── static/
│       │       └── tracker.js
│       ├── scripts/
│       │   ├── capture_pam_annotated.py   ← Paths atualizados (relativos)
│       │   └── capture_pam_pages.py       ← Paths atualizados (relativos)
│       ├── docs/
│       │   └── UPFRONT_PAM.md        ← Documentação de arquitetura PAM
│       ├── requirements.txt
│       └── package.json
├── src/
│   ├── assets/                       ← Destino dos screenshots gerados
│   ├── components/
│   ├── routes/
│   └── ...
├── MIGRACAO.md                       ← Este documento
├── .gitignore                        ← Atualizado com regras passoapasso
└── ...
```

---

## 4. Passo a Passo da Migração (Executado)

### 4.1 Criação do diretório de destino

```bash
mkdir -p /home/felipe-armani/Documents/Projetos/pamdocs/tools/passoapasso
```

### 4.2 Cópia dos arquivos do projeto `passoapasso`

```bash
cp -r /home/felipe-armani/Documents/Projetos/passoapasso/app \
      /home/felipe-armani/Documents/Projetos/pamdocs/tools/passoapasso/app

cp -r /home/felipe-armani/Documents/Projetos/passoapasso/scripts \
      /home/felipe-armani/Documents/Projetos/pamdocs/tools/passoapasso/scripts

cp -r /home/felipe-armani/Documents/Projetos/passoapasso/docs \
      /home/felipe-armani/Documents/Projetos/pamdocs/tools/passoapasso/docs

cp /home/felipe-armani/Documents/Projetos/passoapasso/requirements.txt \
   /home/felipe-armani/Documents/Projetos/pamdocs/tools/passoapasso/requirements.txt

cp /home/felipe-armani/Documents/Projetos/passoapasso/package.json \
   /home/felipe-armani/Documents/Projetos/pamdocs/tools/passoapasso/package.json
```

### 4.3 Atualização de paths absolutos → relativos

**`capture_pam_annotated.py`:**
```python
# Antes:
OUTPUT = "/home/felipe-armani/Documents/Projetos/pamdocs/src/assets"

# Depois:
OUTPUT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "src", "assets")
```

**`capture_pam_pages.py`:**
```python
# Antes:
OUTPUT_DIR = "/home/felipe-armani/Documents/Projetos/pamdocs/src/assets"

# Depois:
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "src", "assets")
```

A resolução de `__file__`:
```
tools/passoapasso/scripts/capture_*.py
  → dirname #1: tools/passoapasso/scripts/
  → dirname #2: tools/passoapasso/
  → dirname #3: tools/
  → dirname #4: (raiz pamdocs)/
  → join "src/assets" → src/assets/  ✅
```

### 4.4 Atualização do `.gitignore`

Adicionadas regras específicas para o `passoapasso`:

```gitignore
# Passo a Passo — ferramenta de documentação automatizada
tools/passoapasso/output/
tools/passoapasso/__pycache__/
tools/passoapasso/**/__pycache__/
tools/passoapasso/*.pyc
tools/passoapasso/**/*.pyc
tools/passoapasso/.venv/
tools/passoapasso/node_modules/
```

---

## 5. Como Executar as Ferramentas (Nova Localização)

### 5.1 Pré-requisitos

```bash
# Python 3.10+ e virtualenv
cd tools/passoapasso
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Playwright (Node)
npm install
npx playwright install chromium
```

### 5.2 Captura de telas do PAM (simples)

```bash
cd tools/passoapasso
source .venv/bin/activate
python scripts/capture_pam_pages.py
# Gera 01-login.png ... 12-status.png em src/assets/
```

### 5.3 Captura de telas do PAM (com anotações)

```bash
cd tools/passoapasso
source .venv/bin/activate
python scripts/capture_pam_annotated.py
# Gera PNGs anotados com badges, highlights e setas em src/assets/
```

### 5.4 Interface Web (FastAPI)

```bash
cd tools/passoapasso
source .venv/bin/activate
python -m uvicorn app.main:app --reload --port 8000
# Acessar: http://localhost:8000
```

---

## 6. Dependências e Compatibilidade

| Ferramenta        | Versão       | Uso                              |
|-------------------|--------------|----------------------------------|
| Python            | 3.10+        | Runtime principal do passoapasso |
| FastAPI           | latest       | Interface web                    |
| Uvicorn           | latest       | Servidor ASGI                    |
| Playwright (Py)   | ^1.60.0      | Automação de navegador           |
| Playwright (Node) | ^1.60.0      | Instalação de browsers           |
| OpenCV            | latest       | Anotação de imagens              |

> **Nota:** As dependências do `passoapasso` são independentes do `pamdocs` (Bun/Node).  
> O `passoapasso` roda exclusivamente via Python em ambiente local.  
> O `pamdocs` roda via Bun/Vite e é deployado no Cloudflare Workers.

---

## 7. Verificação Pós-Migração

- [x] `tools/passoapasso/app/` — copiado com sucesso
- [x] `tools/passoapasso/scripts/` — copiado e paths atualizados
- [x] `tools/passoapasso/docs/` — copiado com sucesso
- [x] `tools/passoapasso/requirements.txt` — copiado
- [x] `tools/passoapasso/package.json` — copiado
- [x] `.gitignore` — atualizado com regras de exclusão
- [x] `capture_pam_annotated.py` — path `OUTPUT` relativo corrigido
- [x] `capture_pam_pages.py` — path `OUTPUT_DIR` relativo corrigido
- [ ] `scripts/capture_*.py` — testar execução com novos paths
- [ ] `app/main.py` — verificar OUTPUT_DIR (já é relativo ao projeto)
- [ ] Projeto original `passoapasso/` — pode ser arquivado/removido

---

## 8. Próximos Passos Recomendados

1. **Testar os scripts** com os novos paths relativos
2. **Rodar `pip install -r requirements.txt`** no novo local
3. **Arquivar ou remover** o projeto original em `/home/felipe-armani/Documents/Projetos/passoapasso/`
4. **Atualizar documentação** `UPFRONT_PAM.md` se necessário
5. **Criar um README.md** em `tools/passoapasso/` explicando o propósito da ferramenta
6. **Adicionar ao Git**: `git add tools/passoapasso/ MIGRACAO.md .gitignore`

---

## 9. Registro Histórico

| Data       | Ação                                    | Detalhes                                          |
|------------|-----------------------------------------|---------------------------------------------------|
| 01/06/2026 | Criação do `pamdocs`                    | Frontend TanStack Start com 12 módulos PAM        |
| 01/06/2026 | Criação do `passoapasso`                | Ferramenta Python/Playwright/OpenCV isolada       |
| 03/06/2026 | **Consolidação**                        | `passoapasso` movido para `pamdocs/tools/`        |
| 03/06/2026 | Correção de paths                       | Absolutos → Relativos nos scripts Python          |
| 03/06/2026 | Atualização `.gitignore`                | Regras de exclusão para `tools/passoapasso/`      |
| 03/06/2026 | Criação `MIGRACAO.md`                   | Este documento                                    |

---

## 10. Notas e Observações

- O diretório `output/` do passoapasso **não foi copiado** — contém apenas artefatos temporários de sessões de captura
- O diretório `node_modules/` de ambos projetos **não foi copiado** — deve ser reinstalado via `npm install` / `bun install`
- O diretório `.venv/` do passoapasso original **não foi copiado** — deve ser recriado no novo local
- O projeto `pamdocs` continua funcionando **independentemente** do `passoapasso` — a ferramenta é apenas um utilitário de desenvolvimento
- Os assets em `src/assets/*.png` **não foram modificados** — já estavam no destino correto
- O projeto original `passoapasso` em `/home/felipe-armani/Documents/Projetos/passoapasso/` permanece intacto até validação final

---

> 📅 **Última atualização:** 03/06/2026 — Consolidação concluída.
