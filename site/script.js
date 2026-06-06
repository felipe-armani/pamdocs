/* ================================================================
   PAMdocs — SPA Router + Module Data
   ================================================================ */

// ── Module Data ────────────────────────────────────────────
const MODULES = [
  { code: "00", id: "home", to: "/", label: "Visão geral" },
  { code: "01", id: "acesso", to: "/modulos/acesso", label: "Acesso ao ambiente" },
  { code: "02", id: "painel", to: "/modulos/painel", label: "Painel & navegação" },
  { code: "03", id: "usuarios", to: "/modulos/usuarios", label: "Usuários" },
  { code: "04", id: "projetos", to: "/modulos/projetos", label: "Projetos" },
  { code: "05", id: "grupos", to: "/modulos/grupos", label: "Grupos & pessoas" },
  { code: "06", id: "dominios", to: "/modulos/dominios", label: "Domínios & hubs" },
  { code: "07", id: "integracoes", to: "/modulos/integracoes", label: "Integrações" },
  { code: "08", id: "scheduler", to: "/modulos/scheduler", label: "Scheduler" },
  { code: "09", id: "logs", to: "/modulos/logs", label: "Logs de auditoria" },
  { code: "10", id: "status", to: "/modulos/status", label: "Status do sistema" },
];

// ── Module Content ─────────────────────────────────────────
// Each module: { title, intro, steps: [{ title, summary, html }] }
// html is a string of inner HTML for the step content (after summary)
const CONTENT = {

home: {
  title: "Gestão de acessos privilegiados — PAM",
  intro: "Documentação técnica destinada aos usuários finais da operação. Reúne os procedimentos padronizados de acesso, governança de identidades, projetos, grupos e integrações do PAM no ambiente Autodesk Construction Cloud.",
},

acesso: {
  title: "Acesso ao ambiente",
  intro: "Procedimento de autenticação para acesso ao sistema PAM (Product Access Management). Utilize seu e-mail e senha corporativos.",
  steps: [
    {
      title: "Tela de login",
      summary: "Acesse a URL do sistema PAM com seu navegador. Utilize credenciais corporativas fornecidas pelo time de TI.",
      html: `
        ${figure("01-login.png", "Tela de login do PAM", "Fig. 01 — Tela de autenticação do PAM")}
        ${stepList(["Abra a URL do PAM no navegador corporativo.", "Informe seu e-mail corporativo.", "Digite sua senha corporativa.", "Clique em Entrar para acessar o sistema."])}
      `
    },
    {
      title: "Verificação de acesso",
      summary: "O sistema valida automaticamente se seu usuário possui autorização para acessar o produto.",
      html: fieldGrid([
        ["Autenticação", "Single Sign-On corporativo"],
        ["Validação", "Permissões verificadas automaticamente"],
        ["Sessão", "Expição automática por inatividade"],
        ["Segurança", "Credenciais criptografadas"],
      ])
    },
    {
      title: "Problemas de acesso",
      summary: "Caso não consiga acessar, verifique as situações abaixo antes de acionar o suporte.",
      html: stepList([
        "Confira se seu e-mail e senha estão corretos.",
        "Verifique se sua conta está ativa (não bloqueada ou expirada).",
        "Certifique-se de que seu perfil possui acesso ao produto PAM.",
        "Caso o problema persista, acione o suporte de TI.",
      ])
    },
    {
      title: "Redefinição de senha",
      summary: "Utilize a opção 'Esqueci minha senha' na tela de login para recuperar o acesso.",
      html: callout("Próximo passo", "Após autenticação, avance para o módulo <strong>02 — Painel & navegação</strong>.")
    }
  ]
},

painel: {
  title: "Painel & navegação",
  intro: "Dashboard principal com visão consolidada de Pessoas, Projetos, Hubs, Grupos e status de filas Redis.",
  steps: [
    {
      title: "Dashboard principal",
      summary: "Ponto de entrada após login. Exibe 4 cards de KPI e status das filas de processamento.",
      html: `
        ${figure("02-dashboard.png", "Dashboard PAM", "Fig. 02 — Dashboard com cards de estatísticas")}
        ${fieldGrid([
          ["👥 Pessoas", "Total de pessoas cadastradas (filtrado por domínio)"],
          ["📁 Projetos", "Total de projetos (filtrado por domínio)"],
          ["📦 Hubs", "Total de hubs configurados"],
          ["👨‍👩‍👦 Grupos", "Total de grupos de acesso"],
        ])}
      `
    },
    {
      title: "Menu lateral",
      summary: "Sidebar fixa com acesso a todos os módulos: Grupos, Pessoas, Projetos, Configurações.",
      html: stepList([
        "Visão Geral — Dashboard principal (página atual)",
        "Grupos — Lista de grupos de acesso",
        "Pessoas — Cadastro de pessoas",
        "Projetos — Lista de projetos",
        "Scheduler — Agendamento de tarefas",
        "Configurações — Domínios, Usuários, Integrações, Hubs, Status, Logs",
      ])
    },
    {
      title: "Seletor de domínio",
      summary: "Dropdown para filtrar dados por domínio. Superadmin vê todos os domínios; usuários veem apenas o seu.",
      html: callout("Funcionalidade", "Os cards do dashboard e as tabelas são atualizados automaticamente ao trocar o domínio no seletor. O painel também exibe o status de processamento das filas do sistema.")
    }
  ]
},

usuarios: {
  title: "Usuários",
  intro: "Gestão de usuários do sistema com perfis hierárquicos: Superadmin, Admin e Usuário. O acesso a esta tela requer perfil de administrador.",
  steps: [
    {
      title: "Listagem de usuários",
      summary: "Tabela com todos os usuários: Nome, Email, Domínio, Perfil e Status.",
      html: figure("03-usuarios.png", "Listagem de usuários", "Fig. 03 — Tabela de usuários do PAM")
    },
    {
      title: "Perfis de acesso",
      summary: "O sistema possui três níveis de permissão com acessos progressivos.",
      html: fieldGrid([
        ["Superadmin", "Acesso total ao sistema. Gerencia domínios e configurações globais."],
        ["Admin", "Gerencia usuários, projetos, grupos e configurações do seu domínio."],
        ["Usuário", "Acesso às telas principais: dashboard, grupos, pessoas e projetos."],
      ])
    },
    {
      title: "Cadastro e edição",
      summary: "Formulário para criar ou editar usuários com nome, email, domínio e perfil de acesso.",
      html: stepList([
        "Clique em Novo Usuário para abrir o formulário.",
        "Preencha Nome e Email corporativo.",
        "Selecione o domínio e o perfil de acesso.",
        "Para desativar um usuário, selecione-o e acione a opção Desativar.",
      ])
    },
    {
      title: "Permissões por página",
      summary: "Cada perfil tem acesso a um conjunto específico de funcionalidades.",
      html: callout("Resumo de acessos", "<strong>Superadmin:</strong> Todas as funcionalidades.<br><strong>Admin:</strong> Dashboard, Grupos, Pessoas, Projetos, Usuários e Configurações.<br><strong>Usuário:</strong> Dashboard, Grupos, Pessoas e Projetos.")
    }
  ]
},

projetos: {
  title: "Projetos",
  intro: "Gestão de projetos e funções de projeto. Projetos representam contextos onde pessoas e grupos atuam.",
  steps: [
    {
      title: "Listagem de projetos",
      summary: "Tabela com todos os projetos cadastrados: Nome, Descrição e Status.",
      html: figure("04-projetos.png", "Listagem de projetos", "Fig. 04 — Tabela de projetos")
    },
    {
      title: "Criação e edição",
      summary: "Formulário para criar ou editar projetos informando Nome, Descrição e Status.",
      html: stepList([
        "Clique em Novo Projeto para abrir o formulário.",
        "Preencha Nome e Descrição do projeto.",
        "Defina o Status (Ativo, Inativo, etc.).",
        "Salve para confirmar a criação ou edição.",
      ])
    },
    {
      title: "Funções de Projeto",
      summary: "Papéis que pessoas podem ter nos projetos. Exemplos: BIM Manager, Engenheiro, Coordenador.",
      html: callout("Funções disponíveis", "As funções de projeto definem o que cada pessoa pode fazer dentro de um projeto. Exemplos comuns: BIM Manager, Engenheiro, Coordenador, Supervisor, Analista.")
    }
  ]
},

grupos: {
  title: "Grupos & pessoas",
  intro: "Grupos concentram permissões reutilizáveis. Pessoas são vinculadas a grupos para herdar acessos de forma consistente entre projetos.",
  steps: [
    {
      title: "Grupos",
      summary: "Tabela de grupos com Nome, Descrição e quantidade de pessoas vinculadas.",
      html: `
        ${figure("05-grupos.png", "Grupos de acesso", "Fig. 05 — Grupos de acesso")}
        ${stepList([
          "Novo Grupo: preencha Nome e Descrição.",
          "Ações disponíveis: Editar, Excluir e Ver Pessoas.",
          "Acesse os membros do grupo para gerenciar pessoas vinculadas.",
        ])}
      `
    },
    {
      title: "Pessoas",
      summary: "Cadastro de pessoas com Nome, Email e vínculos a grupos e projetos.",
      html: `
        ${figure("06-pessoas.png", "Pessoas cadastradas", "Fig. 06 — Pessoas cadastradas")}
        ${fieldGrid([
          ["Nome", "Nome completo da pessoa"],
          ["Email", "Email de contato"],
          ["Grupos", "Grupos aos quais pertence"],
          ["Projetos", "Projetos associados"],
        ])}
      `
    },
    {
      title: "Associação Projeto-Grupo",
      summary: "Defina quais grupos têm acesso a cada projeto. Uma associação vincula um projeto a um grupo.",
      html: stepList([
        "Acesse a tela de Associações de Projetos.",
        "Selecione o Projeto e o Grupo desejados.",
        "Confirme para criar o vínculo.",
      ])
    }
  ]
},

dominios: {
  title: "Domínios & hubs",
  intro: "Domínios isolam ambientes e Hubs conectam projetos ACC ao PAM. Cada cliente possui seu próprio domínio.",
  steps: [
    {
      title: "Domínios",
      summary: "Cadastro de domínios com Nome e Slug. Cada domínio representa um cliente.",
      html: figure("07-dominios.png", "Lista de domínios", "Fig. 07 — Lista de domínios")
    },
    {
      title: "Hubs",
      summary: "Configuração de hubs ACC vinculados ao PAM. Cada hub corresponde a uma conta ACC.",
      html: `
        ${figure("08-hubs.png", "Lista de hubs", "Fig. 08 — Lista de hubs")}
        ${callout("Integração ACC", "Hubs conectam o PAM ao Autodesk Construction Cloud. Cada domínio pode ter múltiplos hubs configurados.")}
      `
    }
  ]
},

integracoes: {
  title: "Integrações",
  intro: "Conectores corporativos, SCIM e APIs externas. Gerencie as integrações do PAM com sistemas externos.",
  steps: [
    {
      title: "Painel de integrações",
      summary: "Lista de integrações configuradas com tipo, status e última sincronização.",
      html: figure("09-integracoes.png", "Painel de integrações", "Fig. 09 — Integrações configuradas")
    }
  ]
},

scheduler: {
  title: "Scheduler",
  intro: "Agendamento e monitoramento de tarefas automáticas do sistema PAM.",
  steps: [
    {
      title: "Tarefas agendadas",
      summary: "Lista de tarefas recorrentes com intervalo, status e última execução.",
      html: figure("10-scheduler.png", "Tarefas agendadas", "Fig. 10 — Scheduler de tarefas")
    }
  ]
},

logs: {
  title: "Logs de auditoria",
  intro: "Registro de ações realizadas no sistema para fins de auditoria e rastreabilidade.",
  steps: [
    {
      title: "Visualização de logs",
      summary: "Tabela com data, usuário, ação e detalhes da operação.",
      html: figure("11-logs.png", "Logs de auditoria", "Fig. 11 — Logs do sistema")
    }
  ]
},

status: {
  title: "Status do sistema",
  intro: "Monitoramento de filas, workers e saúde dos serviços do PAM.",
  steps: [
    {
      title: "Status de serviços",
      summary: "Visão geral dos serviços com indicadores de saúde e tempo de resposta.",
      html: figure("12-status.png", "Status do sistema", "Fig. 12 — Status do sistema")
    }
  ]
}

}; // end CONTENT

// ── Helper: HTML generators ────────────────────────────────
function figure(src, alt, caption) {
  return `
    <div class="figure" data-zoom="assets/${src}">
      <img src="assets/${src}" alt="${alt}" loading="lazy">
      <span class="fig-badge">🔍 Ampliar</span>
      ${caption ? `<div class="fig-caption">${caption}</div>` : ''}
    </div>`;
}

function stepList(items) {
  return `<ol class="step-list">${items.map((t, i) =>
    `<li><span class="sl-num">${String(i+1).padStart(2,'0')}</span><span>${t}</span></li>`
  ).join('')}</ol>`;
}

function fieldGrid(pairs) {
  return `<div class="field-grid">${pairs.map(([k,v]) =>
    `<div class="fg-item"><div class="fg-k">${k}</div><div class="fg-v">${v}</div></div>`
  ).join('')}</div>`;
}

function callout(title, text) {
  return `<div class="callout"><div class="co-label">${title}</div><div class="co-text">${text}</div></div>`;
}

// ── State ───────────────────────────────────────────────────
let currentModule = null;   // module id or 'home'
let currentStep = 0;        // step index (0-based)
let basePath = '';

// Detect base path for GitHub Pages
(function() {
  const p = window.location.pathname;
  if (p.includes('/pamdocs/')) basePath = '/pamdocs';
})();

// ── Router ──────────────────────────────────────────────────
function navigate(path) {
  history.pushState(null, '', basePath + path);
  renderRoute(path);
}

function getRouteFromPath() {
  let p = window.location.pathname;
  if (basePath) p = p.replace(basePath, '') || '/';
  return p;
}

function renderRoute(path) {
  const main = document.getElementById('main');
  const sid = document.getElementById('sidebar');
  
  if (path === '/') {
    currentModule = 'home';
    currentStep = 0;
    renderHome(main);
  } else {
    const mod = MODULES.find(m => m.to === path && m.id !== 'home');
    if (mod && CONTENT[mod.id]) {
      currentModule = mod.id;
      currentStep = 0;
      renderModule(main, mod, CONTENT[mod.id]);
    } else {
      main.innerHTML = `<div class="hero"><h1>404</h1><p>Página não encontrada.</p><a href="${basePath}/" class="btn" data-nav="/">Voltar ao início</a></div>`;
    }
  }
  
  updateNav();
  if (sid) sid.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
  window.scrollTo(0, 0);
}

// ── Render: Home ────────────────────────────────────────────
function renderHome(main) {
  const mods = MODULES.filter(m => m.id !== 'home');
  main.innerHTML = `
    <section class="hero">
      <div class="doc-ref">DOC · 2026.05 / REV 03</div>
      <div class="hero-eyebrow">Duegetec · Manual operacional</div>
      <h1>${CONTENT.home.title}</h1>
      <p>${CONTENT.home.intro}</p>
      <div class="hero-actions">
        <a href="${basePath}/modulos/acesso" class="btn" data-nav="/modulos/acesso">Iniciar pelo módulo 01 →</a>
        <span class="badge">${mods.length} módulos · etapas guiadas</span>
      </div>
    </section>

    <section class="modules-grid">
      <h2>Módulos disponíveis <span class="count">${String(mods.length).padStart(2,'0')} / ${String(mods.length).padStart(2,'0')}</span></h2>
      <div class="modules-list">
        ${mods.map(m => `
          <a href="${basePath}${m.to}" class="module-card" data-nav="${m.to}">
            <span class="mc-code">${m.code}</span>
            <div>
              <div class="mc-title">${m.label}</div>
              <div class="mc-desc">${getModuleDesc(m.id)}</div>
            </div>
            <span class="mc-arrow">→</span>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="principles">
      <div class="principle"><div class="pr-label">Princípio 01</div><div class="pr-title">Menor privilégio</div><div class="pr-desc">Cada identidade recebe apenas o acesso necessário ao seu papel.</div></div>
      <div class="principle"><div class="pr-label">Princípio 02</div><div class="pr-title">Rastreabilidade</div><div class="pr-desc">Toda concessão e revogação fica registrada com responsável e horário.</div></div>
      <div class="principle"><div class="pr-label">Princípio 03</div><div class="pr-title">Automação</div><div class="pr-desc">Provisionamento e sincronização eliminam tarefas manuais repetitivas.</div></div>
    </section>
  `;
}

function getModuleDesc(id) {
  const map = {
    acesso: "Autenticação corporativa, MFA e validação de perfil.",
    painel: "Visão consolidada de identidades, riscos e atividades.",
    usuarios: "Cadastro, ciclo de vida e provisionamento de contas.",
    projetos: "Criação, parametrização e governança de projetos ACC.",
    grupos: "Estruturas de papéis, grupos funcionais e equipes.",
    dominios: "Domínios confiáveis e hubs ACC vinculados ao PAM.",
    integracoes: "Conectores corporativos, SCIM e APIs externas.",
    scheduler: "Agendamento de tarefas automáticas.",
    logs: "Registro de ações para auditoria.",
    status: "Monitoramento de serviços e filas.",
  };
  return map[id] || '';
}

// ── Render: Module ──────────────────────────────────────────
function renderModule(main, mod, data) {
  const steps = data.steps || [];
  const max = steps.length;
  
  main.innerHTML = `
    <div class="module-header">
      <div class="mh-eyebrow"><span>MÓDULO ${mod.code}</span><span>Procedimento operacional</span></div>
      <h1>${data.title}</h1>
      <p>${data.intro}</p>
    </div>
    ${max > 1 ? `
      <div class="steps-nav">
        ${steps.map((s, i) => `
          <button class="step-tab${i === 0 ? ' active' : ''}" data-step="${i}">
            <span class="st-num">${String(i+1).padStart(2,'0')}</span>
            <span class="st-label">Etapa</span>
            <span class="st-title">${s.title}</span>
          </button>
        `).join('')}
      </div>
    ` : ''}
    <div class="steps-container">
      ${steps.map((s, i) => `
        <div class="step-content${i === 0 ? ' active' : ''}" data-step="${i}">
          <h2>${s.title}</h2>
          <p class="st-summary">${s.summary}</p>
          ${s.html || ''}
        </div>
      `).join('')}
    </div>
    ${max > 1 ? `
      <div class="step-nav-btns">
        <button id="prevStep" disabled>← Etapa anterior</button>
        <span class="snb-counter">01 — ${String(max).padStart(2,'0')}</span>
        <button id="nextStep">Próxima etapa →</button>
      </div>
    ` : ''}
  `;
  
  // Step tab/slide logic
  if (max > 1) {
    currentStep = 0;
    updateStepButtons(max);
    
    main.querySelectorAll('.step-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        currentStep = parseInt(btn.dataset.step);
        showStep(main, currentStep, max);
      });
    });
    
    const prev = main.querySelector('#prevStep');
    const next = main.querySelector('#nextStep');
    if (prev) prev.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(main, currentStep, max); } });
    if (next) next.addEventListener('click', () => { if (currentStep < max - 1) { currentStep++; showStep(main, currentStep, max); } });
  }
  
  // Zoom listeners
  main.querySelectorAll('[data-zoom]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') openZoom(el.dataset.zoom, el.querySelector('.fig-caption')?.textContent || '');
    });
  });
}

function showStep(main, index, max) {
  main.querySelectorAll('.step-tab').forEach((b, i) => b.classList.toggle('active', i === index));
  main.querySelectorAll('.step-content').forEach((c, i) => c.classList.toggle('active', i === index));
  updateStepButtons(max);
  const counter = main.querySelector('.snb-counter');
  if (counter) counter.textContent = `${String(index+1).padStart(2,'0')} — ${String(max).padStart(2,'0')}`;
}

function updateStepButtons(max) {
  const prev = document.getElementById('prevStep');
  const next = document.getElementById('nextStep');
  if (prev) prev.disabled = currentStep === 0;
  if (next) next.disabled = currentStep === max - 1;
}

// ── Navigation Sidebar ──────────────────────────────────────
function buildNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = MODULES.map(m => `
    <a href="${basePath}${m.to}" data-nav="${m.to}">
      <span class="nav-code">${m.code}</span>
      <span>${m.label}</span>
    </a>
  `).join('');
}

function updateNav() {
  const path = getRouteFromPath();
  document.querySelectorAll('#nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === path);
  });
}

// ── Event Delegation ────────────────────────────────────────
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-nav]');
  if (link) {
    e.preventDefault();
    navigate(link.dataset.nav);
  }
});

window.addEventListener('popstate', () => {
  renderRoute(getRouteFromPath());
});

// ── Lightbox ────────────────────────────────────────────────
function openZoom(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeZoom() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('lightbox-close')) closeZoom();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeZoom(); });

// ── Theme Toggle ────────────────────────────────────────────
(function() {
  const saved = localStorage.getItem('pamdocs-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('pamdocs-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

function updateThemeIcon() {
  const btn = document.getElementById('themeToggle');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
updateThemeIcon();

// ── Mobile Menu ─────────────────────────────────────────────
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

document.getElementById('menuBtn').addEventListener('click', () => {
  const sid = document.getElementById('sidebar');
  sid.classList.toggle('open');
  overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  overlay.classList.remove('open');
});

// ── Init ────────────────────────────────────────────────────
buildNav();

// Check for redirect from 404.html (GitHub Pages SPA fallback)
const redirect = sessionStorage.getItem('__pam_redirect');
if (redirect) {
  sessionStorage.removeItem('__pam_redirect');
  history.replaceState(null, '', basePath + redirect);
}
renderRoute(getRouteFromPath());
