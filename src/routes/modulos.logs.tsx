import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Callout, Figure } from "@/components/doc-blocks";
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
        intro="Rastreamento completo de ações executadas no PAM, com filtros por ação, entidade e usuário."
        steps={[
          {
            title: "Listagem",
            summary: "Cada evento registra data, usuário, ação, entidade afetada, ID, IP e status.",
            body: <Figure src={logsImg} alt="Logs de auditoria" caption="Fig. 11 — Logs de auditoria" />,
          },
          {
            title: "Filtros",
            summary: "Combine busca textual com filtros de ação e tipo de entidade para investigar incidentes.",
            body: (
              <StepList
                items={[
                  { label: "Digite termos no campo Buscar (ação, tipo ou usuário)." },
                  { label: "Refine por Ação e Tipo de Entidade." },
                  { label: "Ajuste o tamanho de página conforme o volume." },
                ]}
              />
            ),
          },
          {
            title: "Retenção",
            summary: "Logs são preservados conforme a política de auditoria vigente.",
            body: (
              <Callout title="Política">
                Exportações de logs devem ser justificadas e armazenadas no repositório
                seguro de evidências. Nunca compartilhe IPs ou IDs em canais públicos.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
