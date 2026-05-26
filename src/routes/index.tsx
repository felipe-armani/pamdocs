import { createFileRoute, Link } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manual Operacional · PAM — Duegetec" },
      {
        name: "description",
        content:
          "Documentação técnica para usuários finais da operação PAM integrada ao Autodesk Construction Cloud.",
      },
    ],
  }),
  component: HomePage,
});

const modules = [
  { code: "01", to: "/modulos/acesso", title: "Acesso ao ambiente", desc: "Autenticação corporativa, MFA e validação de perfil." },
  { code: "02", to: "/modulos/painel", title: "Painel & navegação", desc: "Visão consolidada de identidades, riscos e atividades." },
  { code: "03", to: "/modulos/usuarios", title: "Usuários", desc: "Cadastro, ciclo de vida e provisionamento de contas." },
  { code: "04", to: "/modulos/projetos", title: "Projetos", desc: "Criação, parametrização e governança de projetos ACC." },
  { code: "05", to: "/modulos/grupos", title: "Grupos & pessoas", desc: "Estruturas de papéis, grupos funcionais e equipes." },
  { code: "06", to: "/modulos/dominios", title: "Domínios & hubs", desc: "Domínios confiáveis e hubs ACC vinculados ao PAM." },
  { code: "07", to: "/modulos/integracoes", title: "Integrações", desc: "Conectores corporativos, SCIM e APIs externas." },
] as const;

function HomePage() {
  return (
    <DocsLayout>
      <section className="space-y-12">
        <div className="pattern-bg relative overflow-hidden border border-border bg-card px-10 py-16">
          <div className="absolute right-10 top-10 hidden font-mono text-[10px] tabular-nums text-muted-foreground md:block">
            DOC · 2026.05 / REV 03
          </div>
          <div className="eyebrow text-violet">Duegetec · Manual operacional</div>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold uppercase leading-[1.02] tracking-tight md:text-6xl">
            Gestão de acessos privilegiados — PAM
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Documentação técnica destinada aos usuários finais da operação. Reúne os
            procedimentos padronizados de acesso, governança de identidades, projetos,
            grupos e integrações do PAM no ambiente Autodesk Construction Cloud.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/modulos/acesso"
              className="bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
            >
              Iniciar pelo módulo 01
            </Link>
            <span className="text-xs text-muted-foreground">
              7 módulos · etapas guiadas
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-widest">Módulos disponíveis</h2>
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              07 / 07
            </span>
          </div>
          <ul className="mt-px divide-y divide-border border-b border-border">
            {modules.map((m) => (
              <li key={m.code}>
                <Link
                  to={m.to}
                  className="group grid grid-cols-12 items-center gap-6 px-2 py-6 transition-colors hover:bg-muted/60"
                >
                  <span className="col-span-1 font-mono text-sm tabular-nums text-violet">
                    {m.code}
                  </span>
                  <div className="col-span-7">
                    <div className="text-base font-medium uppercase tracking-wide">{m.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{m.desc}</div>
                  </div>
                  <div className="col-span-3 hidden text-xs text-muted-foreground md:block">
                    Wizard guiado · etapas sequenciais
                  </div>
                  <span className="col-span-1 text-right text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
                    Abrir →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {[
            { k: "Princípio 01", t: "Menor privilégio", d: "Cada identidade recebe apenas o acesso necessário ao seu papel." },
            { k: "Princípio 02", t: "Rastreabilidade", d: "Toda concessão e revogação fica registrada com responsável e horário." },
            { k: "Princípio 03", t: "Automação", d: "Provisionamento e sincronização eliminam tarefas manuais repetitivas." },
          ].map((c) => (
            <div key={c.k} className="bg-card p-8">
              <div className="eyebrow text-violet">{c.k}</div>
              <div className="mt-4 text-lg font-semibold uppercase tracking-tight">{c.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </DocsLayout>
  );
}
