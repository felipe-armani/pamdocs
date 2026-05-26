import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ReactNode } from "react";
import logoUrl from "@/assets/duegetec-logo.svg";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { to: "/", label: "Visão geral", code: "00" },
  { to: "/modulos/acesso", label: "Acesso ao ambiente", code: "01" },
  { to: "/modulos/painel", label: "Painel & navegação", code: "02" },
  { to: "/modulos/usuarios", label: "Usuários", code: "03" },
  { to: "/modulos/projetos", label: "Projetos", code: "04" },
  { to: "/modulos/grupos", label: "Grupos & pessoas", code: "05" },
  { to: "/modulos/dominios", label: "Domínios & hubs", code: "06" },
  { to: "/modulos/integracoes", label: "Integrações", code: "07" },
];

export function DocsLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-5">
          <Link to="/" className="flex items-center gap-4">
            <img src={logoUrl} alt="Duegetec" className="h-12 w-auto md:h-14 dark:brightness-0 dark:invert" />
            <span className="hidden h-10 w-px bg-border sm:block" />
            <div className="hidden leading-tight sm:block">
              <div className="eyebrow text-muted-foreground">Engenharia Digital</div>
              <div className="text-sm font-medium">Manual Operacional · PAM</div>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
              <span className="eyebrow">v 3.0 · 2026</span>
              <span className="h-4 w-px bg-border" />
              <span>Autodesk Construction Cloud</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-10 px-8 py-12">
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-8 space-y-6">
            <div>
              <div className="eyebrow text-muted-foreground">Sumário</div>
              <div className="mt-1 h-px bg-border" />
            </div>
            <nav className="space-y-1">
              {nav.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group flex items-baseline gap-4 border-l py-2.5 pl-4 transition-colors ${
                      active
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:border-violet/60 hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[11px] tabular-nums">{item.code}</span>
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="border border-border bg-card p-5">
              <div className="eyebrow text-muted-foreground">Suporte</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Dúvidas operacionais devem ser direcionadas ao time de BIM Management
                via canal interno #pam-suporte.
              </p>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9">{children ?? <Outlet />}</main>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-8 py-6 text-xs text-muted-foreground">
          <span>© Duegetec · Documentação interna</span>
          <span className="eyebrow">Mais tempo para construir de forma inteligente</span>
        </div>
      </footer>
    </div>
  );
}
