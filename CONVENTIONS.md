# Convenções do Projeto — Duegetec Docs

> **Objetivo:** Garantir que toda documentação de produto Duegetec (Profile, PAM e futuros) siga o mesmo padrão visual, estrutural e de código. Nenhuma alteração deve ser feita sem respeitar estas regras.

---

## 1. Estrutura de diretórios

```
projeto/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions — NUNCA alterar sem testar
├── site/
│   ├── index.html              # HTML principal — única página da SPA
│   ├── 404.html                # Fallback para GitHub Pages SPA routing
│   ├── styles.css              # Design system completo (sem frameworks externos)
│   ├── script.js               # Router SPA + dados dos módulos + helpers
│   ├── assets/
│   │   ├── duegetec-logo.svg   # Logo oficial Duegetec (NÃO criar versão customizada)
│   │   ├── 01-login.png        # Screenshots: 00-nome.png
│   │   ├── 02-dashboard.png
│   │   └── ...
│   └── fonts/
│       └── Epilogue-VariableFont_wght.ttf  # Fonte única do projeto. NUNCA trocar
├── .gitignore
├── GH-PAGES.md                 # Instruções de deploy
└── CONVENTIONS.md              # Este arquivo
```

---

## 2. HTML — `index.html`

### 2.1 Estrutura obrigatória do `<header>`

```html
<header id="header">
  <div class="header-inner">
    <a href="/" class="logo" data-nav="home">
      <img src="assets/duegetec-logo.svg" alt="Duegetec" class="logo-img" id="logoImg">
      <span class="logo-divider"></span>
      <div class="logo-text">
        <span class="logo-eyebrow">CATEGORIA</span>
        <span class="logo-title">NOME DO MANUAL · PRODUTO</span>
      </div>
    </a>
    <div class="header-actions">
      <div class="header-selectors">
        <select id="projectSwitcher" class="header-select" aria-label="Selecionar projeto"></select>
        <select id="versionSwitcher" class="header-select" aria-label="Selecionar versão"></select>
      </div>
      <span class="sep"></span>
      <span class="acc">TAGLINE DO PRODUTO</span>
      <button id="themeToggle" class="theme-btn" aria-label="Alternar tema">☀️</button>
    </div>
    <button id="menuBtn" class="menu-btn" aria-label="Menu">☰</button>
  </div>
</header>
```

**Regras:**
- `id="header"`, `id="sidebar"`, `id="main"`, `id="nav"` — NUNCA renomear
- `id="projectSwitcher"`, `id="versionSwitcher"`, `id="themeToggle"`, `id="menuBtn"` — NUNCA renomear
- `data-nav="home"` no logo é obrigatório para o router SPA
- O `<select>` de projeto e versão são preenchidos dinamicamente via JS

### 2.2 Layout principal

```html
<div class="layout">
  <aside id="sidebar">
    <div class="sidebar-sticky">
      <div class="sidebar-label">Sumário</div>
      <div class="sidebar-divider"></div>
      <nav id="nav"></nav>
      <div class="sidebar-support">
        <div class="sidebar-label">Suporte</div>
        <p>MENSAGEM DE SUPORTE</p>
      </div>
    </div>
  </aside>
  <main id="main"></main>
</div>
```

### 2.3 Lightbox e Footer

```html
<div id="lightbox" class="lightbox">
  <button class="lightbox-close" aria-label="Fechar">✕</button>
  <img id="lightboxImg" src="" alt="">
  <p id="lightboxCaption"></p>
</div>
```

IDs do lightbox são imutáveis — o JS referencia `lightbox`, `lightboxImg`, `lightboxCaption`.

---

## 3. CSS — `styles.css`

### 3.1 Regras absolutas

| Regra | Motivo |
|-------|--------|
| **NUNCA usar frameworks CSS externos** (Bootstrap, Tailwind, etc.) | O design system é autossuficiente com CSS variables |
| **NUNCA adicionar novas fontes** | Epilogue é a fonte oficial. Outras fontes quebram a identidade |
| **NUNCA usar cores hexadecimais fixas** | Sempre usar as CSS variables (`var(--violet)`, `var(--fg)`, etc.) |
| **NUNCA alterar as CSS variables** | As cores e tokens foram calibrados para light/dark mode |
| **SEMPRE testar light E dark mode** | Toda alteração CSS deve ser verificada nos dois temas |

### 3.2 CSS Variables (NUNCA alterar nomes)

```css
:root {
  --ink: oklch(0.27 0.05 286);
  --violet: oklch(0.69 0.08 295);
  --blue: oklch(0.55 0.18 250);
  --stone: oklch(0.89 0.005 20);
  --bg: oklch(0.985 0.003 20);
  --fg: var(--ink);
  --card: oklch(1 0 0);
  --card-fg: var(--ink);
  --muted: oklch(0.94 0.005 20);
  --muted-fg: oklch(0.45 0.02 286);
  --border: oklch(0.87 0.01 280);
  --radius: 4px;
  --font: 'Epilogue', system-ui, sans-serif;
}

.dark {
  --bg: oklch(0.18 0.03 286);
  --fg: oklch(0.92 0.005 20);
  --card: oklch(0.22 0.03 286);
  --card-fg: oklch(0.92 0.005 20);
  --muted: oklch(0.25 0.02 286);
  --muted-fg: oklch(0.55 0.03 286);
  --border: oklch(0.30 0.02 286);
  --stone: oklch(0.28 0.02 286);
}
```

### 3.3 Componentes disponíveis (usar APENAS estes)

| Classe | Uso |
|--------|-----|
| `.hero` | Seção hero da home |
| `.module-card` | Cards de módulo na home |
| `.module-header` | Cabeçalho da página de módulo |
| `.steps-nav` / `.step-tab` / `.step-content` | Sistema de abas/etapas |
| `.figure` | Container de screenshot com zoom |
| `.step-list` / `.sl-num` | Lista numerada de passos |
| `.field-grid` / `.fg-item` / `.fg-k` / `.fg-v` | Grid de campos chave-valor |
| `.callout` / `.co-label` / `.co-text` | Caixa de destaque/dica |
| `.doc-table` | Tabela de documentação |
| `.header-select` | Estilo dos `<select>` do header |
| `.principles` / `.principle` | Grid de princípios na home |
| `.btn` | Botão de ação |
| `.badge` | Tag informativa |

**NUNCA criar novos componentes sem antes verificar se os existentes resolvem.**

---

## 4. JavaScript — `script.js`

### 4.1 Estrutura obrigatória do arquivo

A ordem das seções é **imutável**:

```
1. MODULES[]            — Lista de módulos (código, id, rota, label)
2. PROJECTS[]           — Lista de projetos no seletor
3. buildProjectSwitcher()
4. VERSIONS[]           — Lista de versões no seletor
5. buildVersionSwitcher()
6. basePath             — Detecção de GitHub Pages
7. CONTENT{}            — Conteúdo de todos os módulos
8. Helpers              — figure(), stepList(), fieldGrid(), callout()
9. State                — currentModule, currentStep
10. Router              — navigate(), getRouteFromPath(), renderRoute()
11. Render: Home        — renderHome(), getModuleDesc()
12. Render: Module      — renderModule(), showStep(), updateStepButtons()
13. Navigation Sidebar  — buildNav(), updateNav()
14. Event Delegation    — click handler para [data-nav]
15. Lightbox            — openZoom(), closeZoom()
16. Theme Toggle        — dark mode
17. Mobile Menu         — overlay, menu toggle
18. Init                — buildNav(), buildProjectSwitcher(), buildVersionSwitcher(), renderRoute()
```

### 4.2 Como adicionar um módulo

```js
// 1. Adicionar na lista MODULES (respeitar ordem numérica)
{ code: "11", id: "calendario", to: "/modulos/calendario", label: "Calendário" },

// 2. Adicionar conteúdo em CONTENT
calendario: {
  title: "Calendário",
  intro: "Descrição do módulo.",
  steps: [
    {
      title: "Título da etapa",
      summary: "Resumo da etapa em uma frase.",
      html: `
        ${figure("11-calendario.png", "Tela do calendário", "Fig. 11 — Calendário")}
        ${stepList([
          "Passo 1.",
          "Passo 2.",
        ])}
        ${callout("Dica", "Texto da dica.")}
      `
    }
  ]
},

// 3. Adicionar descrição em getModuleDesc()
calendario: "Descrição curta para o card na home.",
```

### 4.3 Helpers — uso correto

```js
// Screenshot com zoom (sempre usar este helper)
figure("nome-arquivo.png", "Alt text", "Fig. XX — Legenda")

// Lista numerada de passos
stepList(["Passo 1", "Passo 2", "Passo 3"])

// Grid chave-valor (2 colunas em desktop)
fieldGrid([
  ["Chave 1", "Valor 1"],
  ["Chave 2", "Valor 2"],
])

// Caixa de destaque
callout("Título", "Texto com <strong>HTML</strong> e <code>código</code>")

// Tabela (HTML puro — usar APENAS a classe .doc-table)
`<table class="doc-table">
  <thead><tr><th>Coluna</th><th>Descrição</th></tr></thead>
  <tbody>
    <tr><td>Dado</td><td>Descrição</td></tr>
  </tbody>
</table>`
```

### 4.4 Regras JS

| Regra | Motivo |
|-------|--------|
| **NUNCA usar frameworks JS** (React, Vue, jQuery, etc.) | A SPA é vanilla JS por design |
| **NUNCA alterar IDs referenciados no JS** | `main`, `nav`, `sidebar`, `lightbox`, `themeToggle`, `menuBtn`, `overlay`, `projectSwitcher`, `versionSwitcher` |
| **NUNCA alterar data-nav** | O router SPA depende disso |
| **SEMPRE usar helpers** | `figure()`, `stepList()`, `fieldGrid()`, `callout()` — NUNCA escrever HTML inline |
| **SEMPRE testar em GitHub Pages** | O `basePath` só funciona corretamente no domínio `github.io` |

---

## 5. Screenshots — `assets/`

### 5.1 Nomenclatura

```
XX-nome-descritivo.png
```

- `XX` = número do módulo (01, 02, ...)
- `nome-descritivo` = slug em minúsculas com hífens
- Sempre PNG, resolução padrão 1200px de largura

### 5.2 Exemplos

| Arquivo | Módulo |
|---------|--------|
| `01-login.png` | Acesso ao ambiente |
| `02-dashboard.png` | Painel & navegação |
| `08-hubs.png` | Configurações — Hubs ACC |

### 5.3 Como referenciar

```js
${figure("01-login.png", "Tela de login", "Fig. 01 — Tela de autenticação")}
```

**NUNCA** usar tag `<img>` diretamente — sempre usar o helper `figure()`.

---

## 6. Projetos e versões

### 6.1 Adicionar novo projeto ao seletor

Editar `PROJECTS[]` em AMBOS os projetos:

```js
const PROJECTS = [
  { id: "profile",   name: "Profile",   url: "https://duegetec.github.io/profiledocs/" },
  { id: "pam",       name: "PAM",       url: "https://felipe-armani.github.io/pamdocs/" },
  { id: "inventory", name: "Inventory", url: "https://duegetec.github.io/inventorydocs/" }, // NOVO
];
```

- `id` — slug único do projeto (usado como `value` do `<option>`)
- `name` — nome de exibição
- `url` — URL completa da documentação publicada
- `CURRENT_PROJECT` — ajustar para o `id` do projeto atual

### 6.2 Adicionar nova versão

```js
const VERSIONS = [
  { label: "v1.0.0", url: "https://duegetec.github.io/profiledocs/" },
  { label: "v1.1.0", url: "https://duegetec.github.io/profiledocs/v1.1.0/" }, // NOVA
];
```

Para versionamento real, hospedar cada versão em um subdiretório ou usando branches/tags no GitHub Pages.

---

## 7. Git e Deploy

### 7.1 Branches

| Branch | Finalidade |
|--------|-----------|
| `main` | Código fonte + dispara deploy automático |

**NUNCA** criar branches adicionais sem necessidade documentada.

### 7.2 Commits

Formato: `tipo: descrição curta em português`

```
feat: adicionar módulo de calendário
fix: corrigir logo quebrado no dark mode
docs: atualizar instruções de deploy
style: ajustar espaçamento dos cards
```

### 7.3 Workflow de deploy (`deploy.yml`)

```yaml
# NUNCA alterar sem testar em um fork primeiro
# O workflow:
# 1. Faz checkout do código
# 2. Configura GitHub Pages
# 3. Faz upload da pasta site/
# 4. Publica no GitHub Pages
```

O deploy é automático em todo push para `main`. Tempo médio: ~20 segundos.

### 7.4 Cache buster

Se o deploy não refletir mudanças, adicionar `?v=N` na tag `<script>` e `<link>`:

```html
<script src="script.js?v=4"></script>
<link rel="stylesheet" href="styles.css?v=4">
```

Incrementar o número a cada deploy que precisar forçar refresh.

---

## 8. Checklist de validação

Antes de qualquer push, verificar:

- [ ] Testou light mode e dark mode
- [ ] Testou em resolução mobile (sidebar colapsa)
- [ ] Testou navegação entre todos os módulos
- [ ] Testou zoom em todas as imagens (lightbox)
- [ ] Testou seletor de projetos (redireciona corretamente)
- [ ] Testou seletor de versão
- [ ] Verificou se não há novas classes CSS sem necessidade
- [ ] Verificou se usou helpers em vez de HTML inline
- [ ] Screenshots estão nomeadas corretamente (`XX-nome.png`)
- [ ] Rodou `git diff` para revisar todas as alterações

---

## 9. Exemplos completos

### 9.1 Módulo com figura + steps + callout

```js
exportacao: {
  title: "Exportação de dados",
  intro: "Como exportar relatórios e dados do sistema.",
  steps: [
    {
      title: "Tela de exportação",
      summary: "Acesse a tela de exportação pelo menu lateral.",
      html: `
        ${figure("12-exportacao.png", "Tela de exportação", "Fig. 12 — Exportação de dados")}
        ${stepList([
          "Acesse Relatórios > Exportar no menu lateral.",
          "Selecione o formato desejado (CSV, PDF, Excel).",
          "Escolha o período dos dados.",
          "Clique em Exportar para baixar o arquivo.",
        ])}
        ${callout("Formatos disponíveis", "CSV para dados brutos, PDF para relatórios formatados e Excel para análises.")}
      `
    }
  ]
},
```

### 9.2 Módulo com tabela + field grid

```js
permissoes: {
  title: "Permissões",
  intro: "Matriz de permissões por papel.",
  steps: [
    {
      title: "Matriz de acesso",
      summary: "Tabela com todas as permissões por papel de usuário.",
      html: `
        <table class="doc-table">
          <thead><tr><th>Funcionalidade</th><th>Admin</th><th>Editor</th><th>User</th></tr></thead>
          <tbody>
            <tr><td>Criar usuários</td><td>✅</td><td>❌</td><td>❌</td></tr>
            <tr><td>Editar produtos</td><td>✅</td><td>✅</td><td>❌</td></tr>
            <tr><td>Visualizar dashboard</td><td>✅</td><td>✅</td><td>✅</td></tr>
          </tbody>
        </table>
        ${fieldGrid([
          ["Admin", "Acesso total ao domínio"],
          ["Editor", "Edição de recursos"],
          ["User", "Acesso somente leitura"],
        ])}
      `
    }
  ]
},
```

---

## 10. Regras de ouro

1. **NUNCA invente um componente novo** se já existe um que resolve
2. **NUNCA use HTML inline** — sempre use os helpers (`figure()`, `stepList()`, etc.)
3. **NUNCA altere IDs, classes CSS ou data attributes** que o JS referencia
4. **NUNCA adicione frameworks ou bibliotecas externas**
5. **NUNCA crie variações de estilo** — o design system é único para todos os projetos
6. **SEMPRE documente novas decisões** neste arquivo
7. **SEMPRE teste light + dark + mobile** antes de push
8. **SEMPRE siga a estrutura de diretórios e nomenclatura de arquivos**
