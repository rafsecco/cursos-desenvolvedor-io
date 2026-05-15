# Migrations

Este arquivo descreve como executar as migrations do projeto caso você precise atualizar o banco de dados por meio do Entity Framework.

## Executar migrations com EF Core

1. Abra um terminal na pasta `ProjetoFinal`.
2. Restaure as dependências do back-end:
   ```powershell
   dotnet restore
   ```
3. Execute a migration para atualizar o banco de dados:
   ```powershell
   dotnet ef database update --project src\DevIO.Data --startup-project src\DevIO.Api --context DevIO.Data.Context.MeuDbContext
   dotnet ef database update --project src\DevIO.Api --startup-project src\DevIO.Api --context ApplicationDbContext
   ```

> Se o projeto usar outro `DbContext`, ajuste o parâmetro `--context` conforme necessário.

## Observações

- Use este arquivo apenas se você quiser aplicar migrations via Entity Framework Core.
- O README principal (`README.md`) já inclui o fluxo recomendado usando o script SQL `back-end\sql\criarbanco.sql`.
