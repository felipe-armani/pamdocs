import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { Callout, Figure, StepList } from "@/components/doc-blocks";
import statusImg from "@/assets/12-status.png";

export const Route = createFileRoute("/modulos/status")({
  head: () => ({
    meta: [
      { title: "Status do sistema — Manual PAM" },
      { name: "description", content: "Monitoramento completo do PAM, integrações e serviços." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="10"
        title="Status do sistema"
        intro="Painel consolidado de saúde do PAM, com diagnóstico geral, integrações e serviços conectados."
        steps={[
          {
            title: "Status geral",
            summary: "Identifica rapidamente problemas críticos detectados pelo monitor.",
            body: <Figure src={statusImg} alt="Status do sistema" caption="Fig. 12 — Status do sistema" />,
          },
          {
            title: "Integrações",
            summary: "Lista cada integração com estado de conexão e última verificação.",
            body: (
              <StepList
                items={[
                  { label: "Verifique integrações em estado Desconectado." },
                  { label: "Acione Atualizar para forçar nova verificação." },
                  { label: "Reconfigure em Configurações > Integrações se necessário." },
                ]}
              />
            ),
          },
          {
            title: "Resposta a incidentes",
            summary: "Ao identificar Atenção, registre no canal de suporte e siga o runbook.",
            body: (
              <Callout title="Atenção">
                Estados Atenção persistentes por mais de 30 minutos devem ser escalados
                ao time de plataforma com o snapshot da tela.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
