import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import loginImg from "@/assets/01-login.png";

export const Route = createFileRoute("/modulos/acesso")({
  head: () => ({
    meta: [
      { title: "Acesso ao ambiente — Manual PAM" },
      { name: "description", content: "Autenticação corporativa, MFA e validação de perfil no PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="01"
        title="Acesso ao ambiente"
        intro="Procedimento padronizado para autenticação corporativa, ativação de MFA e validação de permissões no PAM."
        steps={[
          {
            title: "Tela de login",
            summary: "O acesso ao PAM é feito pela URL corporativa oficial usando credenciais do diretório.",
            note: "Não compartilhe credenciais. Em caso de bloqueio acione #pam-suporte.",
            body: (
              <>
                <Figure src={loginImg} alt="Tela de login do PAM" caption="Fig. 01 — Tela de autenticação" />
                <StepList
                  items={[
                    { label: "Abra a URL corporativa do PAM no navegador padrão." },
                    { label: "Informe e-mail corporativo", detail: "Domínios autorizados são validados automaticamente." },
                    { label: "Confirme com a senha do diretório corporativo." },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Autenticação MFA",
            summary: "O segundo fator é obrigatório para todos os perfis com acesso ao PAM.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Provedor", v: "Microsoft Entra ID" },
                  { k: "MFA", v: "Obrigatório · App autenticador" },
                  { k: "Sessão", v: "Expira após 8 horas" },
                  { k: "IP corporativo", v: "Trust list aplicada" },
                ]}
              />
            ),
          },
          {
            title: "Validação de perfil",
            summary: "Confirme função, disciplina e empresa atribuídas ao seu usuário antes de operar.",
            body: (
              <StepList
                items={[
                  { label: "Abra o menu de perfil no canto superior direito." },
                  { label: "Verifique função e empresa exibidas." },
                  { label: "Reporte divergências", detail: "Acione o BIM Manager responsável pelo projeto." },
                ]}
              />
            ),
          },
          {
            title: "Conclusão",
            summary: "Acesso liberado. Prossiga para o módulo 02 — Painel & navegação.",
            body: (
              <Callout title="Próximo passo">
                Avance para o módulo <strong>02 — Painel & navegação</strong>.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
