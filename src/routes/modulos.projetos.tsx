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
        intro="Gestão de projetos e funções de projeto. Projetos representam contextos onde pessoas e grupos atuam."
        steps={[
          {
            title: "Listagem de projetos",
            summary: "Tabela com todos os projetos cadastrados: Nome, Descrição e Status.",
            body: <Figure src={projImg} alt="Listagem de projetos" caption="Fig. 04 — Tabela de projetos" />,
          },
          {
            title: "Criação e edição",
            summary: "Formulário para criar ou editar projetos informando Nome, Descrição e Status.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Projeto para abrir o formulário." },
                  { label: "Preencha Nome e Descrição do projeto." },
                  { label: "Defina o Status (Ativo, Inativo, etc.)." },
                  { label: "Salve para confirmar a criação ou edição." },
                ]}
              />
            ),
          },
          {
            title: "Funções de Projeto",
            summary: "Papéis que pessoas podem ter nos projetos. Exemplos: BIM Manager, Engenheiro, Coordenador.",
            body: (
              <Callout title="Funções disponíveis">
                As funções de projeto definem o que cada pessoa pode fazer dentro de um projeto.
                Exemplos comuns: BIM Manager, Engenheiro, Coordenador, Supervisor, Analista.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
