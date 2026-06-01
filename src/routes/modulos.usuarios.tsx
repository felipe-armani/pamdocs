import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/docs-layout";
import { Wizard } from "@/components/wizard";
import { StepList, FieldGrid, Callout, Figure } from "@/components/doc-blocks";
import usersImg from "@/assets/03-usuarios.png";

export const Route = createFileRoute("/modulos/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários — Manual PAM" },
      { name: "description", content: "Gestão de usuários, perfis de acesso e permissões no PAM." },
    ],
  }),
  component: () => (
    <DocsLayout>
      <Wizard
        module="03"
        title="Usuários"
        intro="Gestão de usuários do sistema com perfis hierárquicos: Superadmin, Admin e Usuário. O acesso a esta tela requer perfil de administrador."
        steps={[
          {
            title: "Listagem de usuários",
            summary: "Tabela com todos os usuários: Nome, Email, Domínio, Perfil e Status.",
            body: (
              <Figure src={usersImg} alt="Listagem de usuários" caption="Fig. 03 — Tabela de usuários do PAM" />
            ),
          },
          {
            title: "Perfis de acesso",
            summary: "O sistema possui três níveis de permissão com acessos progressivos.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Superadmin", v: "Acesso total ao sistema. Gerencia domínios e configurações globais." },
                  { k: "Admin", v: "Gerencia usuários, projetos, grupos e configurações do seu domínio." },
                  { k: "Usuário", v: "Acesso às telas principais: dashboard, grupos, pessoas e projetos." },
                ]}
              />
            ),
          },
          {
            title: "Cadastro e edição",
            summary: "Formulário para criar ou editar usuários com nome, email, domínio e perfil de acesso.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Usuário para abrir o formulário." },
                  { label: "Preencha Nome e Email corporativo." },
                  { label: "Selecione o domínio e o perfil de acesso." },
                  { label: "Para desativar um usuário, selecione-o e acione a opção Desativar." },
                ]}
              />
            ),
          },
          {
            title: "Permissões por página",
            summary: "Cada perfil tem acesso a um conjunto específico de funcionalidades.",
            body: (
              <Callout title="Resumo de acessos">
                <strong>Superadmin:</strong> Todas as funcionalidades.{" "}
                <strong>Admin:</strong> Dashboard, Grupos, Pessoas, Projetos, Usuários e Configurações.{" "}
                <strong>Usuário:</strong> Dashboard, Grupos, Pessoas e Projetos.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
