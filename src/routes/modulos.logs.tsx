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
        intro="Registro de todas as ações realizadas no sistema. Permite rastrear operações, investigar incidentes e gerar evidências de auditoria."
        steps={[
          {
            title: "Listagem de logs",
            summary: "Tabela com Data/Hora, Nível, Módulo de origem e Mensagem descritiva de cada evento.",
            body: (
              <>
                <Figure src={logsImg} alt="Logs de auditoria" caption="Fig. 11 — Registro de eventos do sistema" />
                <FieldGrid
                  fields={[
                    { k: "Data/Hora", v: "Momento exato do evento" },
                    { k: "Nível", v: "Informativo · Alerta · Erro" },
                    { k: "Módulo", v: "Componente do sistema que gerou o evento" },
                    { k: "Mensagem", v: "Descrição textual do ocorrido" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Filtros e busca",
            summary: "Combine busca por texto com filtros de nível, data e módulo para localizar eventos específicos.",
            body: (
              <StepList
                items={[
                  { label: "Digite termos no campo de busca para localizar eventos." },
                  { label: "Filtre por Nível: Informativo, Alerta ou Erro." },
                  { label: "Filtre por período usando as datas inicial e final." },
                  { label: "Use a navegação de páginas para grandes volumes de registros." },
                ]}
              />
            ),
          },
          {
            title: "Uso dos logs",
            summary: "Os logs são a principal ferramenta para auditoria e diagnóstico de problemas.",
            body: (
              <Callout title="Recomendação">
                Antes de abrir um chamado de suporte, consulte os logs para obter informações
                sobre o ocorrido. Anote a data/hora e a mensagem do evento para agilizar o atendimento.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});