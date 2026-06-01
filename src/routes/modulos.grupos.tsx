import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Figure } from "@/components/doc-blocks";
import gruposImg from "@/assets/05-grupos.png";
import pessoasImg from "@/assets/06-pessoas.png";

export const Route = createFileRoute("/modulos/grupos")({
  head: () => ({
    meta: [
      { title: "Grupos & pessoas — Manual PAM" },
      { name: "description", content: "Gestão de grupos de acesso e pessoas vinculadas no PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="05"
        title="Grupos & pessoas"
        intro="Grupos concentram permissões reutilizáveis. Pessoas são vinculadas a grupos para herdar acessos de forma consistente."
        steps={[
          {
            title: "Grupos",
            summary: "Tabela de grupos com Nome, Descrição, Qtd. Pessoas. API: GET/POST /api/groups.",
            body: (
              <>
                <Figure src={gruposImg} alt="Listagem de grupos" caption="Fig. 05 — Grupos de acesso" />
                <StepList
                  items={[
                    { label: "Novo Grupo: modal com Nome e Descrição." },
                    { label: "Ações: Editar, Excluir, Ver Pessoas." },
                    { label: "Link para /groups/{id}/people gerencia membros." },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Pessoas",
            summary: "Cadastro de pessoas com Nome, Email, Telefone. API: GET/POST /api/people.",
            body: (
              <>
                <Figure src={pessoasImg} alt="Listagem de pessoas" caption="Fig. 06 — Pessoas cadastradas" />
                <FieldGrid
                  fields={[
                    { k: "Nome", v: "Nome completo da pessoa" },
                    { k: "Email", v: "Email de contato" },
                    { k: "Grupos", v: "Grupos aos quais pertence" },
                    { k: "Projetos", v: "Projetos associados" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Project Groups",
            summary: "Associação entre projetos e grupos. Define quais grupos têm acesso a quais projetos.",
            body: (
              <StepList
                items={[
                  { label: "Acesse /project-groups para ver associações." },
                  { label: "API: GET/POST /api/project_groups." },
                  { label: "Cada associação vincula um Projeto + Grupo." },
                ]}
              />
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
