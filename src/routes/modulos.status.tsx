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
        intro="Painel de monitoramento da saúde do sistema. Exibe o estado de cada serviço, filas de processamento e integrações."
        steps={[
          {
            title: "Visão geral",
            summary: "Indicadores visuais mostram o estado de cada componente do sistema em tempo real.",
            body: (
              <>
                <Figure src={statusImg} alt="Status do sistema" caption="Fig. 12 — Painel de status do sistema" />
                <FieldGrid
                  fields={[
                    { k: "Aplicação Web", v: "Servidor principal do PAM" },
                    { k: "Processamento", v: "Serviço de tarefas em segundo plano" },
                    { k: "Banco de dados", v: "Armazenamento de dados" },
                    { k: "Cache", v: "Serviço deCache e filas" },
                    { k: "Autenticação", v: "Serviço de autenticação corporativa" },
                    { k: "API", v: "Serviço de integração" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Filas de processamento",
            summary: "Monitoramento das filas de tarefas. Cada fila mostra a quantidade de itens pendentes.",
            body: (
              <StepList
                items={[
                  { label: "Verifique filas com acúmulo de tarefas (indicador amarelo ou vermelho)." },
                  { label: "O sistema processa as filas automaticamente." },
                  { label: "Filas paradas por mais de 5 minutos exigem investigação." },
                ]}
              />
            ),
          },
          {
            title: "Resposta a incidentes",
            summary: "Indicadores: 🟢 Normal · 🟡 Atenção · 🔴 Crítico.",
            body: (
              <Callout title="Procedimento">
                <strong>🔴 Crítico:</strong> Comunique imediatamente o time de TI.{" "}
                <strong>🟡 Atenção:</strong> Monitore por 30 minutos; se persistir, abra um chamado.{" "}
                <strong>🟢 Normal:</strong> Nenhuma ação necessária.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
