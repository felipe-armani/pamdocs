import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Callout, Figure } from "@/components/doc-blocks";
import projImg from "@/assets/04-projetos.png";

export const Route = createFileRoute("/modulos/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Manual PAM" },
      { name: "description", content: "Gestão de projetos e funções ACC Industry Roles no PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="04"
        title="Projetos"
        intro="Gestão de projetos e funções de projeto (ACC Industry Roles). Projetos representam contextos onde pessoas e grupos atuam."
        steps={[
          {
            title: "Listagem de projetos",
            summary: "Tabela com todos os projetos: Nome, Descrição, Status. API: GET /api/projects.",
            body: <Figure src={projImg} alt="Listagem de projetos" caption="Fig. 04 — Tabela de projetos" />,
          },
          {
            title: "Criação e edição",
            summary: "Modal para criar/editar projetos com Nome, Descrição e Status.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Projeto." },
                  { label: "Preencha Nome, Descrição e Status." },
                  { label: "Use PUT /api/projects/{id} para editar." },
                  { label: "DELETE /api/projects/{id} para remover." },
                ]}
              />
            ),
          },
          {
            title: "Funções de Projeto",
            summary: "ACC Industry Roles: papéis que pessoas podem ter em projetos. Acessível em /projects/roles.",
            body: (
              <Callout title="Product Roles">
                As funções são gerenciadas via <code>GET/POST /api/product_roles</code>.
                Exemplos: BIM Manager, Engenheiro, Coordenador, Supervisor.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
