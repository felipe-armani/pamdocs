import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Figure } from "@/components/doc-blocks";
import intImg from "@/assets/09-integracoes.png";

export const Route = createFileRoute("/modulos/integracoes")({
  head: () => ({
    meta: [
      { title: "Integrações — Manual PAM" },
      { name: "description", content: "Conectores corporativos, SCIM e APIs vinculados ao PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="07"
        title="Integrações"
        intro="Conectores entre o PAM, diretório corporativo, Autodesk Construction Cloud e sistemas internos."
        steps={[
          {
            title: "Integrações ativas",
            summary: "Tabela com cada conector, sua versão e status da última sincronização.",
            body: <Figure src={intImg} alt="Listagem de integrações" caption="Fig. 09 — Integrações" />,
          },
          {
            title: "Provisionamento SCIM",
            summary: "Criação e desativação automática de usuários a partir do diretório.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Protocolo", v: "SCIM 2.0" },
                  { k: "Provedor", v: "Microsoft Entra ID" },
                  { k: "Ciclo", v: "15 minutos" },
                  { k: "Escopo", v: "Usuários e grupos GRP-PAM-*" },
                ]}
              />
            ),
          },
          {
            title: "APIs externas",
            summary: "Sistemas internos consomem o PAM via API REST com chaves rotacionadas.",
            body: (
              <StepList
                items={[
                  { label: "Solicite chave de API ao BIM Management." },
                  { label: "Use sempre o ambiente de homologação para testes." },
                  { label: "Chaves expiram a cada 90 dias e devem ser rotacionadas." },
                ]}
              />
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
