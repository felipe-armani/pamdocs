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
        intro="Grupos concentram permissões reutilizáveis. Pessoas são vinculadas a grupos para herdar acessos de forma consistente entre projetos."
        steps={[
          {
            title: "Grupos",
            summary: "Tabela de grupos com Nome, Descrição e quantidade de pessoas vinculadas.",
            body: (
              <>
                <Figure src={gruposImg} alt="Listagem de grupos" caption="Fig. 05 — Grupos de acesso" />
                <StepList
                  items={[
                    { label: "Novo Grupo: preencha Nome e Descrição." },
                    { label: "Ações disponíveis: Editar, Excluir e Ver Pessoas." },
                    { label: "Acesse os membros do grupo para gerenciar pessoas vinculadas." },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Pessoas",
            summary: "Cadastro de pessoas com Nome, Email e vínculos a grupos e projetos.",
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
            title: "Associação Projeto-Grupo",
            summary: "Defina quais grupos têm acesso a cada projeto. Uma associação vincula um projeto a um grupo.",
            body: (
              <StepList
                items={[
                  { label: "Acesse a tela de Associações de Projetos." },
                  { label: "Selecione o Projeto e o Grupo desejados." },
                  { label: "Confirme para criar o vínculo." },
                ]}
              />
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
