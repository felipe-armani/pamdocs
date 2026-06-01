import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import schedImg from "@/assets/10-scheduler.png";

export const Route = createFileRoute("/modulos/scheduler")({
  head: () => ({
    meta: [
      { title: "Scheduler — Manual PAM" },
      { name: "description", content: "Agendamento de tarefas recorrentes de sincronização e importação no PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="08"
        title="Scheduler"
        intro="Configuração de tarefas agendadas para execução recorrente de sincronizações e importações. Acesso restrito a administradores."
        steps={[
          {
            title: "Visão geral",
            summary: "Tabela com os agendamentos: Nome, Periodicidade, Status e datas da última e próxima execução.",
            body: (
              <>
                <Figure src={schedImg} alt="Tela do Scheduler" caption="Fig. 10 — Agendamento de tarefas" />
                <FieldGrid
                  fields={[
                    { k: "Nome", v: "Identificador da tarefa" },
                    { k: "Periodicidade", v: "Intervalo de execução configurado" },
                    { k: "Status", v: "Sucesso / Falha / Pendente" },
                    { k: "Próxima execução", v: "Data e hora da próxima rodada" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Novo agendamento",
            summary: "Formulário para criar tarefas recorrentes informando nome, periodicidade e tipo.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Agendamento." },
                  { label: "Defina um Nome descritivo para a tarefa." },
                  { label: "Configure a periodicidade de execução." },
                  { label: "Selecione o tipo de tarefa e os parâmetros necessários." },
                  { label: "Ative o agendamento para iniciar as execuções." },
                ]}
              />
            ),
          },
          {
            title: "Acompanhamento",
            summary: "Monitore o histórico de execuções, verifique falhas e consulte logs detalhados.",
            body: (
              <Callout title="Boas práticas">
                Revise semanalmente as tarefas com falha. Verifique os logs de execução
                para identificar a causa de erros antes de reprocessar.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});