import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, Figure } from "@/components/doc-blocks";
import gruposImg from "@/assets/05-grupos.png";
import pessoasImg from "@/assets/06-pessoas.png";

export const Route = createFileRoute("/modulos/grupos")({
  head: () => ({
    meta: [
      { title: "Grupos & pessoas — Manual PAM" },
      { name: "description", content: "Estruturas de grupos funcionais, papéis e composição de equipes." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="05"
        title="Grupos & pessoas"
        intro="Configuração de grupos funcionais, atribuição de papéis e composição das equipes em cada projeto."
        steps={[
          {
            title: "Grupos",
            summary: "Grupos representam papéis funcionais e concentram permissões reutilizáveis.",
            body: <Figure src={gruposImg} alt="Listagem de grupos" caption="Fig. 05 — Grupos" />,
          },
          {
            title: "Pessoas",
            summary: "Pessoas são vinculadas a grupos para herdarem permissões de forma consistente.",
            body: <Figure src={pessoasImg} alt="Listagem de pessoas" caption="Fig. 06 — Pessoas" />,
          },
          {
            title: "Boa prática",
            summary: "Evite permissões individuais — use sempre grupos para garantir rastreabilidade.",
            body: (
              <StepList
                items={[
                  { label: "Crie grupos por papel funcional, não por pessoa." },
                  { label: "Revise composição mensalmente." },
                  { label: "Documente exceções na ficha do projeto." },
                ]}
              />
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
