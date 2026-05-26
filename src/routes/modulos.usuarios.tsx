import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Figure } from "@/components/doc-blocks";
import usersImg from "@/assets/03-usuarios.png";

export const Route = createFileRoute("/modulos/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários — Manual PAM" },
      { name: "description", content: "Cadastro, ciclo de vida e provisionamento de usuários PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="03"
        title="Usuários"
        intro="Gestão do ciclo de vida das identidades: cadastro, atualização, desativação e auditoria."
        steps={[
          {
            title: "Listagem de usuários",
            summary: "Tabela com todos os usuários sincronizados, com status e função.",
            body: (
              <Figure src={usersImg} alt="Listagem de usuários" caption="Fig. 03 — Tabela de usuários" />
            ),
          },
          {
            title: "Cadastro manual",
            summary: "Quando não houver provisionamento automático, o cadastro é feito pelo BIM Manager.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Campo obrigatório", v: "E-mail corporativo" },
                  { k: "Função", v: "Selecionada por papel RBAC" },
                  { k: "Empresa", v: "Vinculada ao cadastro central" },
                  { k: "Validade", v: "Padrão 90 dias para terceiros" },
                ]}
              />
            ),
          },
          {
            title: "Desativação",
            summary: "Usuários desligados devem ser desativados imediatamente para revogar acessos.",
            body: (
              <StepList
                items={[
                  { label: "Selecione o usuário na listagem." },
                  { label: "Acione Desativar e informe o motivo." },
                  { label: "O sistema revoga grupos e projetos vinculados automaticamente." },
                ]}
              />
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
