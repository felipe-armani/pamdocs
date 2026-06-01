import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import intImg from "@/assets/09-integracoes.png";

export const Route = createFileRoute("/modulos/integracoes")({
  head: () => ({
    meta: [
      { title: "Integrações — Manual PAM" },
      { name: "description", content: "Conectores ACC, Entra ID, Google e PROFILE integrados ao PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="07"
        title="Integrações"
        intro="Configuração de integrações com sistemas externos: ACC Delivery, Microsoft Entra ID, Google Workspace e PROFILE. Acesso restrito a admin+."
        steps={[
          {
            title: "Integrações disponíveis",
            summary: "Cards com toggle de ativação para cada integração. API: GET/POST /api/integrations.",
            body: (
              <>
                <Figure src={intImg} alt="Listagem de integrações" caption="Fig. 09 — Integrações configuráveis" />
                <FieldGrid
                  fields={[
                    { k: "ACC Client", v: "Integração com ACC Delivery (Autodesk Construction Cloud)" },
                    { k: "Entra ID", v: "Azure AD / Microsoft Entra ID para provisionamento" },
                    { k: "Google", v: "Google Workspace para sincronização de usuários" },
                    { k: "PROFILE", v: "Integração SSO nativa (obrigatória)" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Ativação e configuração",
            summary: "Cada integração possui toggle liga/desliga e campos específicos de configuração.",
            body: (
              <StepList
                items={[
                  { label: "Localize o card da integração desejada." },
                  { label: "Ative o toggle para habilitar." },
                  { label: "Preencha os campos de configuração (URLs, chaves, secrets)." },
                  { label: "Salve e verifique o status de conexão." },
                ]}
              />
            ),
          },
          {
            title: "PROFILE Client",
            summary: "A integração com PROFILE é obrigatória para SSO. Configurada via variáveis de ambiente.",
            body: (
              <Callout title="Configuração crítica">
                <strong>DUE_ACCOUNT_URL:</strong> URL do PROFILE (ex: http://profile_web:8000).{" "}
                <strong>DUE_PRODUCT_KEY:</strong> Chave do produto PAM no PROFILE.{" "}
                <strong>profile_jwt_secret_key:</strong> Chave JWT compartilhada para validação de tokens.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});