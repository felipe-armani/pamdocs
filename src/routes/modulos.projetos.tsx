import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Callout, Figure } from "@/components/doc-blocks";
import projImg from "@/assets/04-projetos.png";

export const Route = createFileRoute("/modulos/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Manual PAM" },
      { name: "description", content: "Criação, parametrização e governança de projetos ACC pelo PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="04"
        title="Projetos"
        intro="Estrutura padronizada de criação, parametrização e governança dos projetos no ACC via PAM."
        steps={[
          {
            title: "Listagem de projetos",
            summary: "Apresenta todos os projetos sincronizados ao hub e sua matriz de acessos.",
            body: <Figure src={projImg} alt="Listagem de projetos" caption="Fig. 04 — Tabela de projetos" />,
          },
          {
            title: "Criação",
            summary: "Cada projeto novo segue o template oficial da engenharia digital.",
            body: (
              <StepList
                items={[
                  { label: "Acione Novo projeto." },
                  { label: "Selecione o template Engenharia Digital · Padrão." },
                  { label: "Defina responsável, prazo e grupos iniciais." },
                ]}
              />
            ),
          },
          {
            title: "Governança",
            summary: "Use a aba de governança para revisar acessos e exportar evidências.",
            body: (
              <Callout title="Atenção">
                Toda alteração em projetos é registrada para auditoria. Justifique mudanças
                fora do padrão no campo observações.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
