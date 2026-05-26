import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Callout, Figure } from "@/components/doc-blocks";
import dashImg from "@/assets/02-dashboard.png";

export const Route = createFileRoute("/modulos/painel")({
  head: () => ({
    meta: [
      { title: "Painel & navegação — Manual PAM" },
      { name: "description", content: "Visão geral do painel PAM e estrutura de navegação." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="02"
        title="Painel & navegação"
        intro="Visão consolidada das identidades, projetos, riscos e atividades recentes do ambiente PAM."
        steps={[
          {
            title: "Dashboard principal",
            summary: "Ponto de entrada após o login. Apresenta indicadores agregados e atalhos.",
            body: (
              <>
                <Figure src={dashImg} alt="Dashboard PAM" caption="Fig. 02 — Dashboard PAM" />
                <StepList
                  items={[
                    { label: "Cabeçalho", detail: "Busca global, notificações e perfil do usuário." },
                    { label: "Cartões de KPI", detail: "Usuários ativos, projetos, grupos e alertas em aberto." },
                    { label: "Atividades recentes", detail: "Cronologia das últimas concessões e revogações." },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Menu lateral",
            summary: "Acesso direto aos módulos do PAM: usuários, projetos, grupos, domínios e integrações.",
            body: (
              <Callout title="Boa prática">
                Use o menu lateral fixo para navegação rápida. Itens com selo de alerta indicam
                pendências de revisão.
              </Callout>
            ),
          },
          {
            title: "Filtros e busca",
            summary: "Aplique filtros por projeto, função e período para inspecionar subconjuntos.",
            body: (
              <StepList
                items={[
                  { label: "Use a busca global para localizar identidades ou projetos." },
                  { label: "Combine filtros para isolar pendências de aprovação." },
                ]}
              />
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
