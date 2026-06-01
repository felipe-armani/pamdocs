import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import loginImg from "@/assets/01-login.png";

export const Route = createFileRoute("/modulos/acesso")({
  head: () => ({
    meta: [
      { title: "Acesso ao ambiente — Manual PAM" },
      { name: "description", content: "Autenticação corporativa e acesso ao sistema PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="01"
        title="Acesso ao ambiente"
        intro="Procedimento de autenticação para acesso ao sistema PAM (Product Access Management). Utilize seu e-mail e senha corporativos."
        steps={[
          {
            title: "Tela de login",
            summary: "Acesse a URL do sistema PAM com seu navegador. Utilize credenciais corporativas fornecidas pelo time de TI.",
            body: (
              <>
                <Figure src={loginImg} alt="Tela de login do PAM" caption="Fig. 01 — Tela de autenticação do PAM" />
                <StepList
                  items={[
                    { label: "Abra a URL do PAM no navegador corporativo." },
                    { label: "Informe seu e-mail corporativo." },
                    { label: "Digite sua senha corporativa." },
                    { label: "Clique em Entrar para acessar o sistema." },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Verificação de acesso",
            summary: "O sistema valida automaticamente se seu usuário possui autorização para acessar o produto.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Autenticação", v: "Single Sign-On corporativo" },
                  { k: "Validação", v: "Permissões verificadas automaticamente" },
                  { k: "Sessão", v: "Expição automática por inatividade" },
                  { k: "Segurança", v: "Credenciais criptografadas" },
                ]}
              />
            ),
          },
          {
            title: "Problemas de acesso",
            summary: "Caso não consiga acessar, verifique as situações abaixo antes de acionar o suporte.",
            body: (
              <StepList
                items={[
                  { label: "Confira se seu e-mail e senha estão corretos." },
                  { label: "Verifique se sua conta está ativa (não bloqueada ou expirada)." },
                  { label: "Certifique-se de que seu perfil possui acesso ao produto PAM." },
                  { label: "Caso o problema persista, acione o suporte de TI." },
                ]}
              />
            ),
          },
          {
            title: "Redefinição de senha",
            summary: "Utilize a opção 'Esqueci minha senha' na tela de login para recuperar o acesso.",
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
