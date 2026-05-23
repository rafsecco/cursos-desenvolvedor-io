# Projeto Final — Desenvolvimento Avançado em Angular

Aplicação full-stack de gerenciamento de fornecedores e produtos, desenvolvida como projeto final do curso **Desenvolvimento Avançado em Angular** da [Desenvolvedor.io](https://desenvolvedor.io).

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | Angular 21 · TypeScript · Bootstrap 5 |
| Back-end | ASP.NET Core 3.1 · Identity · JWT |
| Banco de dados | SQL Server (LocalDB para desenvolvimento) |
| Testes E2E | Playwright |
| SSR | Angular SSR + Express |

---

## Estrutura do Projeto

```
ProjetoFinal/
├── back-end/               # API .NET
│   ├── src/
│   │   ├── DevIO.Api/      # Controllers, ViewModels, Configuração
│   │   ├── DevIO.Business/ # Entidades, Interfaces, Serviços
│   │   └── DevIO.Data/     # Repositórios, DbContext, Migrations
│   └── sql/
│       └── criarbanco.sql  # Script de criação do banco
└── front-end/              # SPA Angular 21
    ├── src/app/
    │   ├── conta/          # Autenticação (login, cadastro)
    │   ├── fornecedor/     # CRUD de fornecedores + endereços
    │   ├── produto/        # CRUD de produtos + imagens
    │   ├── navegacao/      # Menu, Header, Footer, Home
    │   └── services/       # Interceptors, AuthStateService
    └── e2e/                # Testes E2E com Playwright
```

---

## Pré-requisitos

- [.NET SDK 3.1](https://dotnet.microsoft.com/download/dotnet/3.1)
- [SQL Server LocalDB](https://learn.microsoft.com/sql/database-engine/configure-windows/sql-server-express-localdb) ou SQL Server completo
- [Node.js 20+](https://nodejs.org)
- [Angular CLI 21](https://angular.dev/tools/cli): `npm install -g @angular/cli`

---

## Como Executar

### 1. Back-end (.NET)

```bash
cd back-end

# Restaurar dependências
dotnet restore

# Criar o banco de dados
sqlcmd -S "(localdb)\mssqllocaldb" -i sql/criarbanco.sql
# Ou execute o script no SQL Server Management Studio (SSMS)

# Iniciar a API (http://localhost:5000)
dotnet run --project src/DevIO.Api
```

> A string de conexão padrão usa `(localdb)\mssqllocaldb`. Para alterar, edite  
> `src/DevIO.Api/appsettings.Development.json`.

### 2. Front-end (Angular)

```bash
cd front-end

# Instalar dependências
npm install

# Configurar variáveis de ambiente (ver seção abaixo)
cp src/environments/environment.development.ts.example \
   src/environments/environment.development.ts
# Edite o arquivo e preencha googleMapsKey com sua chave

# Iniciar o servidor de desenvolvimento (http://localhost:4200)
npm start
```

---

## Acesso ao Sistema

O banco de dados é criado apenas com a estrutura — **sem usuários pré-cadastrados**.

### Primeiro acesso

1. Acesse `http://localhost:4200` (dev) ou `http://localhost:8080` (Docker)
2. Clique em **Crie sua conta** e registre um novo usuário
3. Faça login com as credenciais cadastradas

> O usuário recém-criado **não tem permissão** para gerenciar fornecedores e produtos por padrão.  
> É necessário adicionar as claims de autorização via SQL.

### Adicionar permissões ao usuário

Execute o script de seed (substitua o e-mail pelo cadastrado):

```sql
USE [MinhaApiCore];

DECLARE @UserId NVARCHAR(450);
SELECT @UserId = Id FROM AspNetUsers WHERE Email = 'seu@email.com';

INSERT INTO AspNetUserClaims (UserId, ClaimType, ClaimValue) VALUES
    (@UserId, 'Fornecedor', 'Adicionar,Atualizar,Excluir'),
    (@UserId, 'Produto',    'Adicionar,Atualizar,Excluir');
```

Após executar o SQL, **faça logout e login novamente** para o novo JWT incluir as claims.

### Usuário de teste (E2E)

O arquivo `e2e/seed.sql` cria automaticamente o usuário de teste com todas as permissões e dados de exemplo:

| Campo | Valor |
|---|---|
| E-mail | `teste@teste.com` |
| Senha | `Teste@123` |
| Permissões | Fornecedor e Produto (Adicionar, Atualizar, Excluir) |

```bash
# Aplicar o seed (banco local)
sqlcmd -S "(localdb)\mssqllocaldb" -i e2e/seed.sql

# Aplicar o seed (Docker)
docker exec -i minhaapicore-sqlserver \
  /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "MinhaS3nh@Forte!" -C \
  -i /dev/stdin < e2e/seed.sql
```

---

## Variáveis de Ambiente

O arquivo `src/environments/environment.development.ts` **não é commitado** (está no `.gitignore`).  
Use o template como base:

```ts
// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrlv1: 'http://localhost:5000/api/v1/',
  imagensUrl: 'http://localhost:5000/',
  googleMapsKey: 'SUA_CHAVE_GOOGLE_MAPS_AQUI',
};
```

> Crie uma chave em [console.cloud.google.com](https://console.cloud.google.com) →  
> APIs & Services → Credentials → Maps Embed API.

---

## Scripts Disponíveis (front-end)

| Comando | Descrição |
|---|---|
| `npm start` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Build de produção (`dist/`) |
| `npm run watch` | Build incremental em modo desenvolvimento |
| `npm test` | Testes unitários com Vitest |
| `npm run e2e` | Testes E2E completos com Playwright |
| `npm run e2e:produto` | Apenas testes do módulo de produto |

---

## Módulos da Aplicação

### Conta
- Cadastro de novo usuário
- Login com JWT
- Gerenciamento de sessão via `AuthStateService` (signals)

### Fornecedores
- Listagem, criação, edição e exclusão
- Edição de endereço via modal (ng-bootstrap)
- Busca automática de endereço por CEP (ViaCEP)
- Visualização de localização no Google Maps
- Listagem de produtos do fornecedor

### Produtos
- Listagem, criação, edição e exclusão
- Upload e preview de imagem (FileReader nativo)
- Formatação de valor monetário com `ngx-mask`
- Associação com fornecedor

---

## Testes E2E (Playwright)

```bash
cd front-end

# Executar todos os testes (app deve estar rodando na porta 4200)
npm run e2e

# Executar apenas testes de produto
npm run e2e:produto

# Modo debug (browser visível)
npx playwright test --config=e2e/playwright.config.ts --headed

# Relatório HTML
npx playwright show-report
```

Os testes estão em `e2e/src/` e seguem o padrão **Page Object Model**:

```
e2e/src/
├── app.base.po.ts                           # Base: login, navegação
└── cadastro-produto/
    ├── app.cadastro-produto.po.ts           # Page Object de produtos
    ├── app.cadastro-produto.spec.ts         # Specs dos testes
    └── imagem_teste.jpg                     # Fixture de imagem
```

---

## Arquitetura Angular 21

O projeto foi migrado do Angular 8 para o Angular 21 aplicando os padrões modernos:

- **Standalone Components** — sem NgModules nas features
- **Signals** — estado local reativo (`signal`, `computed`, `effect`)
- **Control Flow Syntax** — `@if`, `@for`, `@switch` em vez de `*ngIf`/`*ngFor`
- **Functional Guards/Resolvers** — `CanActivateFn`, `ResolveFn`
- **`inject()`** — injeção de dependência sem construtores
- **`takeUntilDestroyed`** — gerenciamento de subscriptions sem `ngOnDestroy`
- **HTTP Interceptors funcionais** — auth e tratamento de erros via `withInterceptors`
- **SSR** — Server-Side Rendering com `@angular/ssr`

---

## Docker

### Pré-requisito
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução

---

### Subir tudo com um comando

Na pasta `ProjetoFinal/` (raiz do projeto):

```bash
# Primeira execução — faz o build das imagens e sobe todos os serviços
docker compose up --build

# Execuções subsequentes (imagens já construídas)
docker compose up

# Em background (detached)
docker compose up -d
```

Serviços iniciados automaticamente:

| Serviço | URL | Descrição |
|---|---|---|
| `frontend` | http://localhost:8080 | Angular + NGINX |
| `api` | http://localhost:5000 | ASP.NET Core 3.1 |
| `sqlserver` | localhost:1433 | SQL Server 2022 Developer |
| `init-db` | — | Cria o banco na primeira vez |

> O `init-db` roda o script `back-end/sql/criarbanco.sql` automaticamente e encerra.  
> Nas próximas subidas, os dados persistem no volume `minhaapicore-sqlserver-data`.

---

### Parar e remover

```bash
# Parar os containers (dados persistem no volume)
docker compose down

# Parar E remover o volume do banco (reseta os dados)
docker compose down -v
```

---

### Logs e diagnóstico

```bash
# Logs de todos os serviços
docker compose logs -f

# Logs de um serviço específico
docker compose logs -f api
docker compose logs -f frontend

# Status dos containers
docker compose ps
```

---

### Executar containers individualmente (sem Compose)

**Back-end:**
```bash
cd back-end
docker build -t minhaapicore-api .
docker run -d --name minhaapicore-api -p 5000:80 \
  -e "ConnectionStrings__DefaultConnection=Server=host.docker.internal;Database=MinhaApiCore;User Id=sa;Password=MinhaS3nh@Forte!;TrustServerCertificate=True;MultipleActiveResultSets=True" \
  minhaapicore-api
```

**Front-end:**
```bash
cd front-end
docker build -t minhaapicore-frontend .
docker run -d --name minhaapicore-frontend -p 8080:80 minhaapicore-frontend
```

> A URL da API (`http://localhost:5000`) é compilada no build Angular via `environment.ts`.  
> Para apontar para outro host, altere o arquivo antes de executar `docker build`.

---

## Segurança

- Autenticação via **JWT Bearer** (gerenciado pelo interceptor `authInterceptor`)
- Autorização por **Claims** (`FornecedorGuard`, `ProdutoGuard`)
- Variáveis sensíveis (Google Maps API Key) em arquivos de environment **não commitados**
- `errorInterceptor` global: redireciona para login em respostas 401 e para acesso negado em 403
