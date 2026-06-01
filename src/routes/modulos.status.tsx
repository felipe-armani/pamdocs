import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { Callout, Figure, StepList, FieldGrid } from "@/components/doc-blocks";
import statusImg from "@/assets/12-status.png";

export const Route = createFileRoute("/modulos/status")({
  head: () => ({
    meta: [
      { title: "Status do sistema — Manual PAM" },
      { name: "description", content: "Monitoramento de containers, filas Redis e workers do PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="10"
        title="Status do sistema"
        intro="Painel de saúde do PAM com status dos containers Docker, filas Redis, workers Celery e integrações. APIs: GET /api/status + GET /api/redis/status."
        steps={[
          {
            title: "Status geral",
            summary: "Visão consolidada dos serviços: web, worker, mysql, redis e integrações.",
            body: (
              <>
                <Figure src={statusImg} alt="Status do sistema" caption="Fig. 12 — Status do sistema PAM" />
                <FieldGrid
                  fields={[
                    { k: "pam_web", v: "Uvicorn na porta 8005" },
                    { k: "pam_worker", v: "Celery worker para tasks assíncronas" },
                    { k: "pam_mysql", v: "MySQL 8.0 na porta 3307" },
                    { k: "pam_redis", v: "Cache e filas Redis" },
                    { k: "profile_web", v: "SSO PROFILE na porta 8006" },
                    { k: "profile_api", v: "API PROFILE na porta 8007" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Filas Redis",
            summary: "Monitoramento de filas de processamento com contagem de tarefas pendentes.",
            body: (
              <StepList
                items={[
                  { label: "Verifique filas com tasks pendentes (indicador amarelo/vermelho)." },
                  { label: "Workers ativos processam as filas automaticamente." },
                  { label: "Filas paradas por mais de 5 min exigem investigação." },
                ]}
              />
            ),
          },
          {
            title: "Resposta a incidentes",
            summary: "Indicadores: 🟢 Saudável · 🟡 Atenção · 🔴 Crítico.",
            body: (
              <Callout title="Runbook">
                <strong>🔴 Crítico:</strong> Escalar imediatamente ao time de plataforma.{" "}
                <strong>🟡 Atenção:</strong> Monitorar por 30 min; se persistir, abrir chamado.{" "}
                <strong>🟢 Saudável:</strong> Nenhuma ação necessária.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
