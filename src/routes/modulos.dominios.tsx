import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { Callout, Figure, FieldGrid } from "@/components/doc-blocks";
import domImg from "@/assets/07-dominios.png";
import hubsImg from "@/assets/08-hubs.png";

export const Route = createFileRoute("/modulos/dominios")({
  head: () => ({
    meta: [
      { title: "Domínios & hubs — Manual PAM" },
      { name: "description", content: "Domínios sincronizados via PROFILE e hubs do PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="06"
        title="Domínios & hubs"
        intro="Domínios representam as organizações no sistema. Hubs são centros de distribuição de projetos. Acesso restrito a administradores."
        steps={[
          {
            title: "Domínios",
            summary: "Gerenciamento de domínios — restrito ao perfil Superadmin. Cada domínio isola usuários e projetos.",
            body: (
              <>
                <Figure src={domImg} alt="Listagem de domínios" caption="Fig. 07 — Domínios" />
                <FieldGrid
                  fields={[
                    { k: "Acesso", v: "Restrito ao Superadmin" },
                    { k: "Sincronização", v: "Domínios sincronizados com o sistema de autenticação" },
                    { k: "Multi-domínio", v: "Usuários podem pertencer a múltiplos domínios" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Hubs",
            summary: "Hubs organizam a distribuição de projetos dentro de cada domínio.",
            body: <Figure src={hubsImg} alt="Listagem de hubs" caption="Fig. 08 — Hubs" />,
          },
          {
            title: "Governança",
            summary: "Domínios garantem isolamento entre organizações. Hubs estruturam a distribuição interna de projetos.",
            body: (
              <Callout title="Política">
                Apenas o Superadmin pode gerenciar domínios. Administradores de domínio
                gerenciam hubs dentro da sua própria organização. Usuários comuns não
                têm acesso a estas telas.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
