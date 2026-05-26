import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { Callout, Figure } from "@/components/doc-blocks";
import domImg from "@/assets/07-dominios.png";
import hubsImg from "@/assets/08-hubs.png";

export const Route = createFileRoute("/modulos/dominios")({
  head: () => ({
    meta: [
      { title: "Domínios & hubs — Manual PAM" },
      { name: "description", content: "Configuração de domínios confiáveis e hubs ACC vinculados ao PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="06"
        title="Domínios & hubs"
        intro="Configuração de domínios autorizados e vinculação dos hubs do Autodesk Construction Cloud ao PAM."
        steps={[
          {
            title: "Domínios confiáveis",
            summary: "Apenas usuários de domínios autorizados podem ser provisionados no PAM.",
            body: <Figure src={domImg} alt="Listagem de domínios" caption="Fig. 07 — Domínios confiáveis" />,
          },
          {
            title: "Hubs ACC",
            summary: "Cada hub é vinculado ao PAM para sincronização de projetos e papéis.",
            body: <Figure src={hubsImg} alt="Listagem de hubs" caption="Fig. 08 — Hubs ACC" />,
          },
          {
            title: "Governança",
            summary: "Sempre use o hub de produção. Hubs sandbox são apenas para testes aprovados.",
            body: (
              <Callout title="Política">
                Hubs sandbox não podem armazenar dados produtivos. Solicite revisão antes de
                vincular um novo hub.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
