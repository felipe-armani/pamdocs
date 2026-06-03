# 🚀 Deploy no GitHub Pages — Passo a Passo

> **Branch:** `gh-pages-deploy`  
> **Data:** 03/06/2026  
> **Projeto:** PAMdocs — Manual Operacional PAM

---

## 📋 Pré-requisitos

- Repositório no GitHub (ex: `duegetec/pamdocs`)
- Permissão de `Actions` habilitada no repositório
- Branch `gh-pages-deploy` (já criada)

---

## ⚙️ 1. Configurar o GitHub Pages no repositório

1. Acesse o repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Clique em **Save**

![Configuração: Settings → Pages → Source = GitHub Actions]

---

## 🔐 2. Verificar permissões do workflow

1. Vá em **Settings** → **Actions** → **General**
2. Em **Workflow permissions**, selecione:
   - ✅ **Read and write permissions**
3. Marque:
   - ✅ **Allow GitHub Actions to create and approve pull requests**

---

## 🚀 3. Disparar o deploy

### Opção A — Push na branch (automático)

```bash
git checkout gh-pages-deploy
git push origin gh-pages-deploy
```

O workflow dispara automaticamente no push para `gh-pages-deploy` ou `main`.

### Opção B — Manual (via interface)

1. Vá em **Actions** → **Deploy to GitHub Pages**
2. Clique em **Run workflow** → selecione a branch → **Run workflow**

---

## 📊 4. Acompanhar o deploy

1. Vá em **Actions** → clique no workflow em execução
2. O job `build-and-deploy` executa:
   - Checkout do código
   - `bun install` → instala dependências
   - `bun run build` → build do projeto (Vite + TanStack Start)
   - `bun run prerender` → gera `index.html` + `404.html` estáticos
   - Upload para GitHub Pages
   - Deploy

3. Ao finalizar, a URL estará disponível em:

   ```
   https://<seu-usuario>.github.io/pamdocs/
   ```

   Ou, se for um repositório de organização:

   ```
   https://<organizacao>.github.io/pamdocs/
   ```

---

## 📁 5. Estrutura do deploy

```
_site/
├── index.html          ← Entry point SPA
├── 404.html            ← SPA routing fallback (GitHub Pages trick)
├── .nojekyll           ← Evita que GitHub ignore arquivos com _
├── favicon.svg
├── fonts/              ← Epilogue (fonte)
└── assets/
    ├── index-*.js      ← JS bundles (React + TanStack Router)
    ├── modulos.*.js    ← Route chunks (lazy loaded)
    ├── styles-*.css    ← Tailwind CSS
    ├── 01-login-*.png  ← Screenshots (12)
    └── ...
```

---

## 🔄 6. Atualizar o site

Sempre que houver alterações na branch `gh-pages-deploy` (ou `main`):

```bash
# Fazer alterações no código...
git add -A
git commit -m "descrição das alterações"
git push origin gh-pages-deploy
# O GitHub Actions faz o deploy automaticamente 🎉
```

---

## 🛠️ 7. Testar localmente antes do deploy

```bash
# Build completo + pre-render
bun run build:gh-pages

# Servir os arquivos estáticos para testar
cd _site
python3 -m http.server 8080
# Acessar: http://localhost:8080
```

> ⚠️ O SPA precisa servir `index.html` para qualquer rota.  
> O comando `python3 -m http.server` **não** faz isso nativamente.  
> Para testar corretamente, use:
> ```bash
> npx serve _site -s   # -s = single page app mode
> ```

---

## 🐛 8. Troubleshooting

| Problema | Solução |
|----------|---------|
| Página em branco no GitHub Pages | Verifique se `_site/.nojekyll` existe. O Jekyll ignora arquivos com `_` no nome. |
| Erro 404 nas rotas internas | O `404.html` deve existir e conter o script de redirecionamento. |
| Imagens quebradas | Verifique se os PNGs estão em `_site/assets/` com hash no nome. |
| CSS não carrega | Confirme que o `<link>` no `index.html` aponta para o arquivo CSS correto. |
| Workflow falhou | Vá em Actions → clique no job → veja os logs de erro. |

---

## 📝 9. Arquivos criados

| Arquivo | Função |
|---------|--------|
| `.github/workflows/deploy-gh-pages.yml` | Workflow de CI/CD |
| `scripts/prerender.mjs` | Script que gera HTML estático para SPA |
| `package.json` (script `prerender` e `build:gh-pages`) | Comandos npm |

---

> 📅 **Última atualização:** 03/06/2026 — Workflow criado e build testado.
