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
        intro="Configuração de tarefas agendadas (jobs recorrentes) para sincronização, importação e validação de dados. Acesso restrito a admin+."
        steps={[
          {
            title: "Visão geral",
            summary: "Tabela de agendamentos com Nome, Expressão Cron, Status, Última/Próxima execução. API: GET/POST /api/scheduler.",
            body: (
              <>
                <Figure src={schedImg} alt="Tela do Scheduler" caption="Fig. 10 — Scheduler de tarefas" />
                <FieldGrid
                  fields={[
                    { k: "Nome", v: "Identificador do job" },
                    { k: "Cron", v: "Expressão cron (ex: 0 */6 * * *)" },
                    { k: "Status", v: "Sucesso / Falha / Pendente" },
                    { k: "Ações", v: "Preview, Fix, Validation por link_id" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Novo agendamento",
            summary: "Modal para criar jobs com Nome, Expressão Cron, Tipo de tarefa e Parâmetros.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Agendamento." },
                  { label: "Defina Nome e Expressão Cron." },
                  { label: "Selecione o Tipo de tarefa (sync, import, validate)." },
                  { label: "Configure parâmetros específicos e ative." },
                ]}
              />
            ),
          },
          {
            title: "Preview e validação",
            summary: "Sub-páginas para dry-run, correção e validação de links antes da execução real.",
            body: (
              <Callout title="Ferramentas de diagnóstico">
                <strong>/config/scheduler/preview/{'{link_id}'}</strong> — Dry-run do job.{" "}
                <strong>/config/scheduler/fix/{'{link_id}'}</strong> — Correção de links.{" "}
                <strong>/config/scheduler/validation/{'{link_id}'}</strong> — Validação de integridade.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});