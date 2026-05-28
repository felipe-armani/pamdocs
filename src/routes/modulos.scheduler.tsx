import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Callout, Figure } from "@/components/doc-blocks";
import schedImg from "@/assets/10-scheduler.png";

export const Route = createFileRoute("/modulos/scheduler")({
  head: () => ({
    meta: [
      { title: "Scheduler — Manual PAM" },
      { name: "description", content: "Vínculos agendados entre grupos de pessoas e grupos de projetos." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="08"
        title="Scheduler"
        intro="Configuração de vínculos agendados que sincronizam grupos de pessoas com grupos de projetos em janelas pré-definidas."
        steps={[
          {
            title: "Visão geral",
            summary: "A tela Scheduler centraliza todos os vínculos automatizados entre grupos de pessoas e grupos de projetos.",
            body: <Figure src={schedImg} alt="Tela do Scheduler" caption="Fig. 10 — Scheduler" />,
          },
          {
            title: "Novo vínculo",
            summary: "Crie um novo agendamento informando origem, grupo de projetos e janela de repetição.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Vínculo." },
                  { label: "Selecione tipo, origem e grupo de projetos." },
                  { label: "Defina a repetição e ative o vínculo." },
                ]}
              />
            ),
          },
          {
            title: "Monitoramento",
            summary: "Acompanhe status e próxima execução diretamente na listagem.",
            body: (
              <Callout title="Boa prática">
                Revise vínculos com falha semanalmente e mantenha o filtro Todos os status
                como padrão para visibilidade completa.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
