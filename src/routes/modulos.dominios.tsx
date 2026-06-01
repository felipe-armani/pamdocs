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
        intro="Domínios são tenants/organizações sincronizadas a partir do PROFILE. Hubs são centros de distribuição. Acesso restrito a superadmin/admin."
        steps={[
          {
            title: "Domínios",
            summary: "Gerenciamento de domínios — apenas superadmin. Sincronizados do PROFILE via POST /api/domains/sync-from-profile.",
            body: (
              <>
                <Figure src={domImg} alt="Listagem de domínios" caption="Fig. 07 — Domínios (apenas superadmin)" />
                <FieldGrid
                  fields={[
                    { k: "Acesso", v: "Apenas superadmin" },
                    { k: "Origem", v: "Sincronizados do PROFILE" },
                    { k: "API", v: "GET /api/domains · POST /sync-from-profile" },
                    { k: "Multi-domínio", v: "Usuário pode pertencer a múltiplos domínios" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Hubs",
            summary: "Hubs são pontos centrais de distribuição/organização. API: GET/POST /api/hubs.",
            body: <Figure src={hubsImg} alt="Listagem de hubs" caption="Fig. 08 — Hubs" />,
          },
          {
            title: "Governança",
            summary: "Domínios são a base do isolamento multi-tenant. Hubs organizam a distribuição interna.",
            body: (
              <Callout title="Política">
                Apenas superadmin pode gerenciar domínios. Admins de domínio gerenciam hubs
                dentro do seu próprio domínio. Usuários não têm acesso a estas telas.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
