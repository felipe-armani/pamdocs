import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import dashImg from "@/assets/02-dashboard.png";

export const Route = createFileRoute("/modulos/painel")({
  head: () => ({
    meta: [
      { title: "Painel & navegação — Manual PAM" },
      { name: "description", content: "Visão geral do dashboard PAM com cards de estatísticas e navegação." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="02"
        title="Painel & navegação"
        intro="Dashboard principal com visão consolidada de Pessoas, Projetos, Hubs, Grupos e status de filas Redis."
        steps={[
          {
            title: "Dashboard principal",
            summary: "Ponto de entrada após login. Exibe 4 cards de KPI e status das filas de processamento.",
            body: (
              <>
                <Figure src={dashImg} alt="Dashboard PAM" caption="Fig. 02 — Dashboard com cards de estatísticas" />
                <FieldGrid
                  fields={[
                    { k: "👥 Pessoas", v: "Total de pessoas cadastradas (filtrado por domínio)" },
                    { k: "📁 Projetos", v: "Total de projetos (filtrado por domínio)" },
                    { k: "📦 Hubs", v: "Total de hubs configurados" },
                    { k: "👨‍👩‍👦 Grupos", v: "Total de grupos de acesso" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Menu lateral",
            summary: "Sidebar fixa com acesso a todos os módulos: Grupos, Pessoas, Projetos, Configurações.",
            body: (
              <StepList
                items={[
                  { label: "Visão Geral", detail: "Dashboard principal (página atual)" },
                  { label: "Grupos", detail: "Lista de grupos de acesso" },
                  { label: "Pessoas", detail: "Cadastro de pessoas" },
                  { label: "Projetos", detail: "Lista de projetos" },
                  { label: "Scheduler", detail: "Agendamento de tarefas" },
                  { label: "Configurações", detail: "Domínios, Usuários, Integrações, Hubs, Status, Logs" },
                ]}
              />
            ),
          },
          {
            title: "Seletor de domínio",
            summary: "Dropdown para filtrar dados por domínio. Superadmin vê todos os domínios; usuários veem apenas o seu.",
            body: (
              <Callout title="Funcionalidade">
                Os cards de KPI e as tabelas são atualizados automaticamente ao trocar o domínio
                no seletor. O endpoint <code>GET /api/redis/status</code> alimenta o status das filas.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});