

# ProjetoFinal

## Como executar o projeto

1. Abra um terminal na pasta `ProjetoFinal\back-end`.
2. Restaure as dependências do back-end:
   ```powershell
   dotnet restore
   ```
3. Crie o banco de dados SQL Server local usando o script SQL:
   ```powershell
   sqlcmd -S localhost -i sql\criarbanco.sql
   ```
   Ou execute `ProjetoFinal\back-end\sql\criarbanco.sql` no SQL Server Management Studio (SSMS).
4. Execute a API:
   ```powershell
   dotnet run --project src\DevIO.Api
   ```

5. Abra outro terminal e vá para a pasta do front-end:
   ```powershell
   cd front-end
   ```
6. Instale as dependências do front-end:
   ```powershell
   npm install
   ```
7. Execute o front-end:
   ```powershell
   npm start
   ```

> Certifique-se de que o SQL Server local está em execução e a string de conexão está correta em `src\DevIO.Api\appsettings.Development.json` ou no arquivo de configuração correspondente.

