import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import loginImg from "@/assets/01-login.png";

export const Route = createFileRoute("/modulos/acesso")({
  head: () => ({
    meta: [
      { title: "Acesso ao ambiente — Manual PAM" },
      { name: "description", content: "Autenticação SSO via PROFILE, credenciais e validação de produto no PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="01"
        title="Acesso ao ambiente"
        intro="Procedimento de autenticação Single Sign-On via PROFILE para acesso ao sistema PAM (Product Access Management)."
        steps={[
          {
            title: "Tela de login",
            summary: "O PAM utiliza SSO integrado ao PROFILE. A tela de login valida o produto antes de permitir autenticação.",
            note: "Credenciais: admin@example.com / Admin@123 (ambiente de desenvolvimento).",
            body: (
              <>
                <Figure src={loginImg} alt="Tela de login do PAM" caption="Fig. 01 — Tela de autenticação PAM integrada ao PROFILE" />
                <StepList
                  items={[
                    { label: "Acesse http://localhost:8005 no navegador." },
                    { label: "O sistema verifica se o produto PAM está ativo no PROFILE", detail: "Via DUE_PRODUCT_KEY configurada no .env" },
                    { label: "Informe e-mail e senha corporativos", detail: "Autenticação delegada ao PROFILE via POST /api/auth/login" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Fluxo SSO",
            summary: "A autenticação é processada pelo PROFILE, que retorna tokens JWT em cookies HttpOnly.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Provedor SSO", v: "PROFILE (porta 8006/8007)" },
                  { k: "Token", v: "JWT · HttpOnly cookie" },
                  { k: "Validação", v: "profile_jwt_secret_key" },
                  { k: "Produto", v: "Verificado via DUE_PRODUCT_KEY" },
                  { k: "Sessão", v: "30 minutos (access token)" },
                  { k: "Refresh", v: "7 dias (refresh token)" },
                ]}
              />
            ),
          },
          {
            title: "Validação de produto",
            summary: "Antes do login, o PAM verifica se o produto está ativo no PROFILE. Se inativo, exibe tela de bloqueio.",
            body: (
              <StepList
                items={[
                  { label: "PAM consulta PROFILE: verify_product()", detail: "Usa a chave DUE_PRODUCT_KEY" },
                  { label: "Se produto ativo → exibe formulário de login" },
                  { label: "Se produto inativo → redireciona para /product-not-active" },
                  { label: "Superadmin bypassa verificação de produto" },
                ]}
              />
            ),
          },
          {
            title: "Redefinição de senha",
            summary: "Fluxo de recuperação disponível em /forgot-password com token enviado por email.",
            body: (
              <Callout title="Próximo passo">
                Após autenticação, avance para o módulo <strong>02 — Painel & navegação</strong>.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
