import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Callout, FieldGrid, Figure } from "@/components/doc-blocks";
import logsImg from "@/assets/11-logs.png";

export const Route = createFileRoute("/modulos/logs")({
  head: () => ({
    meta: [
      { title: "Logs de auditoria — Manual PAM" },
      { name: "description", content: "Visualização e filtragem dos logs de auditoria do PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="09"
        title="Logs de auditoria"
        intro="Rastreamento completo de ações no PAM. Cada evento registra timestamp, nível, módulo e mensagem. API: GET /api/logs."
        steps={[
          {
            title: "Listagem de logs",
            summary: "Tabela com Timestamp, Nível (INFO/WARNING/ERROR), Módulo e Mensagem.",
            body: (
              <>
                <Figure src={logsImg} alt="Logs de auditoria" caption="Fig. 11 — Logs do sistema" />
                <FieldGrid
                  fields={[
                    { k: "Timestamp", v: "Data/hora do evento" },
                    { k: "Nível", v: "INFO · WARNING · ERROR" },
                    { k: "Módulo", v: "Componente de origem (auth, api, worker)" },
                    { k: "Mensagem", v: "Descrição textual do evento" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Filtros e busca",
            summary: "Combine busca textual com filtros por nível, data e módulo para investigar incidentes.",
            body: (
              <StepList
                items={[
                  { label: "Digite termos no campo de busca textual." },
                  { label: "Filtre por Nível: INFO, WARNING ou ERROR." },
                  { label: "Filtre por período (data inicial e final)." },
                  { label: "Use paginação para navegar em grandes volumes." },
                ]}
              />
            ),
          },
          {
            title: "Boas práticas",
            summary: "Logs são essenciais para auditoria e debugging. Consulte antes de abrir chamados.",
            body: (
              <Callout title="Política de retenção">
                Logs são armazenados conforme política de retenção configurada. Para
                investigações, sempre anote o timestamp e o session_id antes de acionar o suporte.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});