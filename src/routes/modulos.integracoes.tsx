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
        intro="Configuração de integrações com sistemas externos corporativos. Acesso restrito a administradores."
        steps={[
          {
            title: "Integrações disponíveis",
            summary: "Cards com toggle de ativação para cada sistema integrado ao PAM.",
            body: (
              <>
                <Figure src={intImg} alt="Listagem de integrações" caption="Fig. 09 — Integrações configuráveis" />
                <FieldGrid
                  fields={[
                    { k: "ACC", v: "Autodesk Construction Cloud — gestão de projetos e usuários" },
                    { k: "Entra ID", v: "Microsoft Entra ID — provisionamento de identidades" },
                    { k: "Google", v: "Google Workspace — sincronização de usuários" },
                    { k: "Autenticação", v: "Sistema de autenticação corporativa (SSO)" },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Ativação e configuração",
            summary: "Cada integração possui botão para ativar/desativar e campos específicos de configuração.",
            body: (
              <StepList
                items={[
                  { label: "Localize o card da integração desejada." },
                  { label: "Ative a chave liga/desliga para habilitar." },
                  { label: "Preencha os campos de configuração conforme orientação do time de TI." },
                  { label: "Salve e verifique o status da conexão." },
                ]}
              />
            ),
          },
          {
            title: "Integração de autenticação",
            summary: "A integração com o sistema de autenticação corporativa é obrigatória para o funcionamento do SSO.",
            body: (
              <Callout title="Importante">
                A integração de autenticação é configurada pelo time de plataforma e não deve
                ser alterada sem autorização. Em caso de dúvidas, acione o suporte técnico.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});