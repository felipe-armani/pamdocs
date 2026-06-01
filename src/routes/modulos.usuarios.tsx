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
        intro="Gestão de usuários do sistema com perfis hierárquicos: Superadmin, Admin e Usuário. Acesso requer role admin em ao menos um domínio."
        steps={[
          {
            title: "Listagem de usuários",
            summary: "Tabela com todos os usuários: Nome, Email, Domínio, Perfil, Status. Apenas admin+ acessa.",
            body: (
              <Figure src={usersImg} alt="Listagem de usuários" caption="Fig. 03 — Tabela de usuários do PAM" />
            ),
          },
          {
            title: "Perfis de acesso",
            summary: "Sistema de roles hierárquico controlado pelo PROFILE e pelo middleware de autenticação.",
            body: (
              <FieldGrid
                fields={[
                  { k: "Superadmin", v: "Acesso total. Bypassa verificação de produto. ID=1 no banco." },
                  { k: "Admin", v: "CRUD no seu domínio. Acessa /users, /config/*, /domains." },
                  { k: "Usuário", v: "Apenas visualização. Sem acesso às telas de configuração." },
                  { k: "Autenticação", v: "JWT HttpOnly cookie · validado via profile_jwt_secret_key" },
                ]}
              />
            ),
          },
          {
            title: "Cadastro e edição",
            summary: "Formulário modal para criar/editar usuários com nome, email, senha, domínio e papéis.",
            body: (
              <StepList
                items={[
                  { label: "Clique em Novo Usuário para abrir o modal." },
                  { label: "Preencha Nome, Email e Senha." },
                  { label: "Selecione o domínio e os papéis (roles) do usuário." },
                  { label: "Para desativar, selecione o usuário e acione Desativar." },
                ]}
              />
            ),
          },
          {
            title: "Permissões por página",
            summary: "Matriz de acesso: nem todas as páginas estão disponíveis para todos os perfis.",
            body: (
              <Callout title="Matriz de acesso">
                <strong>Superadmin:</strong> Todas as páginas.{" "}
                <strong>Admin:</strong> Dashboard, Grupos, Pessoas, Projetos, Usuários, Configurações.{" "}
                <strong>Usuário:</strong> Apenas Dashboard, Grupos, Pessoas, Projetos.
              </Callout>
            ),
          },
        ]}
      />
    </DocsLayout>
  ),
});
