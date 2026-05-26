import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import img01 from "@/assets/01-login.png";
import img02 from "@/assets/02-dashboard.png";
import img03 from "@/assets/03-usuarios.png";
import img04 from "@/assets/04-projetos.png";
import img05 from "@/assets/05-grupos.png";
import img06 from "@/assets/06-pessoas.png";
import img07 from "@/assets/07-dominios.png";
import img08 from "@/assets/08-hubs.png";
import img09 from "@/assets/09-integracoes.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const modules = [
  { id: "00", slug: "visao-geral", title: "Visão geral", url: "/dashboard", desc: "Apresentação do sistema, princípios e estrutura modular." },
  { id: "01", slug: "acesso", title: "Acesso ao ambiente", url: "/  ·  /forgot-password", desc: "Login, recuperação de senha, perfil e encerramento de sessão." },
  { id: "02", slug: "usuarios", title: "Gestão de usuários", url: "/users", desc: "Identidades, permissões e wizard de cadastro em 3 etapas." },
  { id: "03", slug: "projetos", title: "Estrutura de projetos", url: "/projects", desc: "Criação, parametrização e governança de projetos ACC." },
  { id: "04", slug: "grupos", title: "Gestão de grupos", url: "/groups", desc: "Agrupamentos lógicos de pessoas e vínculos com projetos." },
  { id: "05", slug: "sincronizacao", title: "Sincronização ACC", url: "/people", desc: "Importação de pessoas e gestão de Product Roles." },
  { id: "06", slug: "configuracoes", title: "Configurações", url: "/domains  ·  /config/*", desc: "Domínios, integrações ACC, Entra ID, Google e hubs." },
  { id: "07", slug: "logs", title: "Auditoria e logs", url: "/config/logs", desc: "Rastreabilidade completa de todas as ações do sistema." },
  { id: "08", slug: "agendador", title: "Agendador", url: "/config/scheduler", desc: "Tarefas automáticas, sync diária e monitoramento." },
];

function Logo() {
  return (
    <svg viewBox="0 0 64 48" className="h-9 w-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 24 L20 4 L44 4 L60 24 L44 44 L20 44 Z" />
      <path d="M20 4 L20 44 M44 4 L44 44 M4 24 L60 24" />
      <path d="M20 4 L44 44 M44 4 L20 44" opacity="0.5" />
    </svg>
  );
}

function Step({ n, total, title, children }: { n: number; total: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-accent pl-5 py-2">
      <div className="font-mono text-[11px] tracking-widest text-muted-foreground mb-1">
        ETAPA {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <div className="font-display font-semibold mb-2">{title}</div>
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function Section({ id, num, kicker, title, children }: any) {
  return (
    <section id={id} className="scroll-mt-24 mb-24">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="font-mono text-sm text-accent font-semibold">{num}</span>
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">{kicker}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 tracking-tight">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Figure({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-8 border border-border rounded-sm overflow-hidden bg-paper">
      <img src={src} alt={alt} className="w-full" loading="lazy" />
      <figcaption className="font-mono text-[11px] tracking-wider text-muted-foreground px-4 py-2 border-t border-border bg-muted/40">
        FIG · {alt}
      </figcaption>
    </figure>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="border border-border rounded-sm overflow-hidden my-6">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left font-mono text-[11px] tracking-widest uppercase text-muted-foreground px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((c, j) => <td key={j} className="px-4 py-3 align-top">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Index() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        {/* HEADER */}
        <header className="border-b border-border bg-paper/70 backdrop-blur sticky top-0 z-40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="leading-tight">
                <div className="font-display text-lg font-bold tracking-tight">duegetec</div>
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Engenharia Digital</div>
              </div>
              <div className="hidden md:block ml-6 pl-6 border-l border-border">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Manual Operacional · PAM</div>
                <div className="font-display text-sm font-semibold">Gestão de Acessos Privilegiados</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-mono text-[11px] tracking-widest text-muted-foreground">V 3.0 · MAIO 2026</span>
              <button
                onClick={() => setDark(!dark)}
                className="font-mono text-[11px] tracking-widest border border-border px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {dark ? "☀ LIGHT" : "☾ DARK"}
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 blueprint opacity-60" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 relative">
            <div className="font-mono text-[11px] tracking-widest text-muted-foreground mb-6">
              DUEGETEC · MANUAL OPERACIONAL · DOC 2026.05 / REV 03
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] max-w-5xl">
              PAM SYSTEM<br />
              <span className="text-accent">Gestão de Acessos</span><br />
              Privilegiados.
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed">
              Plataforma centralizada de gestão de identidades da Duegetec. Controla quem acessa o quê dentro do ecossistema
              Autodesk Construction Cloud — eliminando acessos excessivos e reduzindo riscos operacionais.
            </p>
            <blockquote className="mt-10 pl-6 border-l-2 border-accent italic font-display text-xl text-foreground/80">
              "Mais tempo para construir de forma inteligente."
            </blockquote>
            <div className="mt-12 flex flex-wrap gap-3">
              <a href="#m00" className="bg-primary text-primary-foreground px-6 py-3 font-mono text-xs tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors">
                INICIAR LEITURA →
              </a>
              <a href="#m01" className="border border-border px-6 py-3 font-mono text-xs tracking-widest hover:bg-muted transition-colors">
                09 MÓDULOS · ETAPAS GUIADAS
              </a>
            </div>
          </div>
        </section>

        {/* LAYOUT */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12">
          {/* TOC */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="font-mono text-[11px] tracking-widest text-muted-foreground mb-4 pb-3 border-b border-border">SUMÁRIO</div>
            <nav className="space-y-1">
              {modules.map((m) => (
                <a key={m.id} href={`#m${m.id}`} className="flex items-baseline gap-3 py-2 px-2 -mx-2 hover:bg-muted text-sm group">
                  <span className="font-mono text-[11px] text-muted-foreground group-hover:text-accent">{m.id}</span>
                  <span className="font-medium">{m.title}</span>
                </a>
              ))}
              <div className="mt-6 pt-4 border-t border-border space-y-1">
                <a href="#anexos" className="flex items-baseline gap-3 py-2 px-2 -mx-2 hover:bg-muted text-sm group">
                  <span className="font-mono text-[11px] text-muted-foreground group-hover:text-accent">A–D</span>
                  <span className="font-medium">Anexos</span>
                </a>
              </div>
            </nav>
            <div className="mt-8 p-4 border border-border bg-paper">
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">SUPORTE</div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Dúvidas operacionais devem ser direcionadas ao time de TI Corporativa via canal interno
                <span className="font-mono"> #pam-suporte</span>.
              </p>
            </div>
          </aside>

          {/* MAIN */}
          <main>
            {/* MODULE INDEX */}
            <div className="mb-24">
              <div className="font-mono text-[11px] tracking-widest text-muted-foreground mb-6 flex justify-between border-b border-border pb-3">
                <span>MÓDULOS DISPONÍVEIS</span><span>09 / 09</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                {modules.map((m) => (
                  <a key={m.id} href={`#m${m.id}`} className="bg-paper p-6 hover:bg-accent/10 transition-colors group">
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-mono text-2xl font-bold text-accent">{m.id}</span>
                      <span className="font-mono text-[10px] tracking-widest text-muted-foreground group-hover:text-foreground">ABRIR →</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2 uppercase tracking-tight">{m.title}</h3>
                    <p className="text-sm text-foreground/70 mb-3 leading-relaxed">{m.desc}</p>
                    <div className="font-mono text-[10px] tracking-wider text-muted-foreground">{m.url}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* 00 */}
            <Section id="m00" num="00" kicker="Painel · Visão geral" title="Visão geral do sistema">
              <p className="text-lg leading-relaxed text-foreground/80">
                O PAM System é a plataforma centralizada de gestão de identidades e acessos da Duegetec. Controla quem acessa o quê
                dentro do ecossistema Autodesk Construction Cloud (ACC), garantindo que cada profissional tenha exatamente as permissões
                necessárias para sua função.
              </p>
              <h3 className="font-display text-xl font-semibold mt-8">00.2 Princípios operacionais</h3>
              <Table
                headers={["Princípio", "Diretriz"]}
                rows={[
                  [<strong>Padronização</strong>, "Toda identidade segue nomenclatura e estrutura única. Nada é criado fora do padrão."],
                  [<strong>Rastreabilidade</strong>, "Cada ação de criação, alteração ou remoção mantém histórico íntegro."],
                  [<strong>Eficiência</strong>, "Automações substituem processos manuais. O sistema trabalha para que você projete."],
                ]}
              />
              <Figure src={img02} alt="Dashboard principal do PAM System" />
            </Section>

            {/* 01 */}
            <Section id="m01" num="01" kicker="/  ·  /forgot-password" title="Acesso ao ambiente">
              <p>Pré-requisito: credenciais fornecidas pelo administrador do sistema.</p>
              <Figure src={img01} alt="Tela de login do PAM System" />
              <h3 className="font-display text-xl font-semibold">01.1 Login no sistema</h3>
              <div className="grid gap-5">
                <Step n={1} total={3} title="Acessar a URL">Acesse o endereço do PAM System informado pelo administrador. A tela de login será exibida.</Step>
                <Step n={2} total={3} title="Inserir credenciais">Preencha email e senha. Clique em <strong>Entrar</strong>.</Step>
                <Step n={3} total={3} title="Primeiro acesso">O sistema solicitará troca da senha temporária. Defina uma senha forte com no mínimo 8 caracteres.</Step>
              </div>
              <h3 className="font-display text-xl font-semibold mt-8">01.2 Recuperação de senha</h3>
              <div className="grid gap-5">
                <Step n={1} total={2} title="Solicitar redefinição">Na tela de login, clique em <em>Esqueci minha senha</em> e informe o e-mail cadastrado.</Step>
                <Step n={2} total={2} title="Definir nova senha">Você receberá um link no e-mail corporativo. O link expira em 30 minutos.</Step>
              </div>
              <h3 className="font-display text-xl font-semibold mt-8">01.3 Encerramento de sessão</h3>
              <p>O sistema encerra automaticamente após 30 minutos de inatividade. Para sair manualmente, clique no perfil → <strong>Sair</strong>.</p>
            </Section>

            {/* 02 */}
            <Section id="m02" num="02" kicker="/users" title="Gestão de usuários">
              <p>Acesse <strong>Usuários</strong> na barra lateral. A tabela exibe todos os usuários do seu domínio.</p>
              <Figure src={img03} alt="Lista de usuários do PAM System" />
              <h3 className="font-display text-xl font-semibold">02.2 Criar novo usuário</h3>
              <div className="grid gap-5">
                <Step n={1} total={3} title="Dados básicos">Email, nome completo, senha (mín. 8 caracteres, 1 maiúscula, 1 número) e confirmação.</Step>
                <Step n={2} total={3} title="Domínio e função">Selecione o domínio organizacional e a função: Superadmin, Admin, Manager ou User.</Step>
                <Step n={3} total={3} title="Confirmação">Revise os dados e marque, se desejar, o envio do e-mail de boas-vindas.</Step>
              </div>
              <h3 className="font-display text-xl font-semibold mt-8">02.4 Desativar usuário</h3>
              <p>A desativação remove o acesso sem excluir histórico. Usuários desativados não consomem licença e podem ser reativados.</p>
            </Section>

            {/* 03 */}
            <Section id="m03" num="03" kicker="/projects" title="Estrutura de projetos">
              <Figure src={img04} alt="Lista de projetos do PAM System" />
              <h3 className="font-display text-xl font-semibold">03.2 Criar novo projeto</h3>
              <div className="grid gap-5">
                <Step n={1} total={4} title="Identificação">Nome do projeto, código ACC e template. O código deve corresponder exatamente ao identificador no Autodesk Construction Cloud.</Step>
                <Step n={2} total={4} title="Parametrização">Domínio, status inicial, data de início e data prevista de término.</Step>
                <Step n={3} total={4} title="Funções do projeto">Product Roles disponíveis: Gerente, Coordenador, Engenheiro Responsável, Arquiteto, Revisor, Aprovador.</Step>
                <Step n={4} total={4} title="Confirmação">Resumo final do projeto antes da sincronização com o ACC.</Step>
              </div>
            </Section>

            {/* 04 */}
            <Section id="m04" num="04" kicker="/groups" title="Gestão de grupos">
              <p>Grupos são unidades lógicas que organizam pessoas e projetos. Um grupo pode conter múltiplas pessoas e estar vinculado a múltiplos projetos.</p>
              <Figure src={img05} alt="Lista de grupos do PAM System" />
              <h3 className="font-display text-xl font-semibold">04.3 Criar novo grupo</h3>
              <div className="grid gap-5">
                <Step n={1} total={3} title="Identificação">Nome, descrição e domínio do grupo. Ex.: "Equipe Estrutural — Obra SP".</Step>
                <Step n={2} total={3} title="Membros">Selecione as pessoas que farão parte do grupo via busca.</Step>
                <Step n={3} total={3} title="Confirmação">Resumo final antes da criação. Vincule projetos depois pela aba <em>Projetos</em>.</Step>
              </div>
            </Section>

            {/* 05 */}
            <Section id="m05" num="05" kicker="/people" title="Sincronização ACC">
              <p>A integração com o Autodesk Construction Cloud mantém o PAM System atualizado com pessoas e funções existentes nos projetos.</p>
              <Figure src={img06} alt="Pessoas sincronizadas do ACC" />
              <h3 className="font-display text-xl font-semibold">05.3 Importar pessoas do ACC</h3>
              <div className="grid gap-5">
                <Step n={1} total={3} title="Origem">Selecione o hub ACC e o projeto ACC de origem.</Step>
                <Step n={2} total={3} title="Mapeamento">Vincule pessoas ACC a usuários PAM existentes ou crie novos automaticamente.</Step>
                <Step n={3} total={3} title="Execução">Confirme a importação. Opcionalmente agende sincronização automática diária.</Step>
              </div>
            </Section>

            {/* 06 */}
            <Section id="m06" num="06" kicker="/domains  ·  /config/*" title="Configurações">
              <h3 className="font-display text-xl font-semibold">06.1 Domínios</h3>
              <p>Unidades organizacionais que agrupam usuários, projetos e grupos. Cada domínio opera de forma independente.</p>
              <Figure src={img07} alt="Gestão de domínios" />
              <h3 className="font-display text-xl font-semibold mt-8">06.2 Integrações</h3>
              <Table
                headers={["Integração", "Função"]}
                rows={[
                  ["ACC (Autodesk Construction Cloud)", "Client ID, Client Secret e Callback URL para sincronização contínua."],
                  ["Microsoft Entra ID", "Single Sign-On e importação de identidades corporativas."],
                  ["Google Workspace", "Importação de usuários e grupos do Google."],
                  ["SMTP", "Envio de notificações e e-mails transacionais do sistema."],
                ]}
              />
              <Figure src={img09} alt="Configuração de integrações" />
              <h3 className="font-display text-xl font-semibold mt-8">06.3 Hubs ACC</h3>
              <p>Hubs representam as instâncias do ACC conectadas ao PAM System. Cada hub lista projetos vinculados, status e última sincronização.</p>
              <Figure src={img08} alt="Hubs ACC conectados" />
            </Section>

            {/* 07 */}
            <Section id="m07" num="07" kicker="/config/logs" title="Auditoria e logs">
              <p>Cada ação realizada no PAM System é registrada no log de auditoria, garantindo rastreabilidade completa e conformidade.</p>
              <Table
                headers={["Coluna", "Descrição"]}
                rows={[
                  ["Data/Hora", "Momento exato da ação"],
                  ["Usuário", "Quem realizou a ação"],
                  ["Ação", "Criar · editar · excluir · importar"],
                  ["Entidade", "Usuário · projeto · grupo · domínio"],
                  ["Detalhes", "Descrição da alteração realizada"],
                ]}
              />
              <p>Filtros disponíveis: período, usuário, ação e domínio.</p>
            </Section>

            {/* 08 */}
            <Section id="m08" num="08" kicker="/config/scheduler" title="Agendador">
              <p>Automatiza tarefas recorrentes, como sincronização de dados com o ACC e importação de identidades corporativas.</p>
              <h3 className="font-display text-xl font-semibold">08.3 Criar nova tarefa</h3>
              <div className="grid gap-5">
                <Step n={1} total={3} title="Tipo e origem">Importação ACC, Sync Google ou Sync Entra ID. Nome identificador.</Step>
                <Step n={2} total={3} title="Parâmetros">Hub, projeto, frequência (diária, semanal, mensal) e horário.</Step>
                <Step n={3} total={3} title="Confirmação">Resumo da tarefa antes do agendamento.</Step>
              </div>
            </Section>

            {/* ANEXOS */}
            <section id="anexos" className="scroll-mt-24 mb-16 pt-12 border-t border-border">
              <div className="font-mono text-[11px] tracking-widest text-muted-foreground mb-2">ANEXOS</div>
              <h2 className="font-display text-4xl font-bold mb-10 tracking-tight">Referências técnicas</h2>

              <h3 className="font-display text-xl font-semibold mb-4">Anexo A — Paleta de cores</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { name: "Azul profundo", hex: "#272541", bg: "#272541", fg: "#fff" },
                  { name: "Lilás vibrante", hex: "#9F9CCD", bg: "#9F9CCD", fg: "#272541" },
                  { name: "Cinza sóbrio", hex: "#DDD7D7", bg: "#DDD7D7", fg: "#272541" },
                  { name: "Rosa acolhedor", hex: "#F7BEBC", bg: "#F7BEBC", fg: "#272541" },
                ].map((c) => (
                  <div key={c.hex} className="border border-border">
                    <div className="h-24" style={{ background: c.bg }} />
                    <div className="p-3">
                      <div className="font-display text-sm font-semibold">{c.name}</div>
                      <div className="font-mono text-xs text-muted-foreground">{c.hex}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-display text-xl font-semibold mb-4">Anexo B — Funções (RBAC)</h3>
              <Table
                headers={["Função", "Acesso"]}
                rows={[
                  [<strong>Superadmin</strong>, "Acesso total. Cria domínios, integrações e gerencia todo o sistema."],
                  [<strong>Admin</strong>, "Gerencia usuários, projetos e configurações dentro do seu domínio."],
                  [<strong>Manager</strong>, "Cria e gerencia projetos e grupos. Visualiza pessoas e logs."],
                  [<strong>User</strong>, "Acesso somente leitura. Visualiza projetos, grupos e pessoas do domínio."],
                ]}
              />

              <h3 className="font-display text-xl font-semibold mb-4 mt-10">Anexo C — Glossário</h3>
              <Table
                headers={["Termo", "Definição"]}
                rows={[
                  [<strong>ACC</strong>, "Autodesk Construction Cloud — plataforma de gestão de construção."],
                  [<strong>Hub</strong>, "Instância do ACC que agrupa projetos de uma organização."],
                  [<strong>Product Role</strong>, "Função exercida por uma pessoa dentro de um projeto no ACC."],
                  [<strong>Domínio</strong>, "Unidade organizacional que agrupa usuários, projetos e grupos."],
                  [<strong>RBAC</strong>, "Role-Based Access Control — controle de acesso baseado em funções."],
                  [<strong>SSO</strong>, "Single Sign-On — autenticação unificada."],
                ]}
              />
            </section>
          </main>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-border bg-paper">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 flex flex-wrap gap-8 justify-between items-end">
            <div>
              <Logo />
              <div className="mt-4 font-display text-lg font-bold">duegetec · Engenharia Digital</div>
              <p className="mt-2 italic text-sm text-muted-foreground max-w-md">"Mais tempo para construir de forma inteligente."</p>
            </div>
            <div className="font-mono text-[11px] tracking-widest text-muted-foreground text-right">
              <div>DOC · 2026.05 / REV 03</div>
              <div className="mt-1">PAM v3.0 · MAIO 2026</div>
              <div className="mt-1">© 2026 DUEGETEC · ALL RIGHTS RESERVED</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
