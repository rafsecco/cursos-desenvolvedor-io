# Front-end — Angular 21

SPA do Projeto Final do curso Desenvolvimento Avançado em Angular.  
Gerado com [Angular CLI](https://github.com/angular/angular-cli) v21.2.7 e migrado do Angular 8.

---

## Pré-requisitos

- Node.js 20+
- Angular CLI 21: `npm install -g @angular/cli`
- Back-end .NET rodando em `http://localhost:5000` (ver `../README.md`)

---

## Setup

```bash
npm install

# Criar o arquivo de ambiente (não commitado)
cp src/environments/environment.development.ts.example \
   src/environments/environment.development.ts

# Editar e preencher a chave do Google Maps
```

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm start` | Dev server com hot-reload em `http://localhost:4200` |
| `npm run build` | Build de produção em `dist/` |
| `npm run watch` | Build incremental (dev) |
| `npm test` | Todos os testes unitários |
| `npm run test:watch` | Testes unitários em modo watch |
| `npm run test:utils` | Validators e validação genérica |
| `npm run test:services` | Interceptors, AuthState e BaseGuard |
| `npm run test:conta` | Autenticação (login, cadastro, service, guards) |
| `npm run test:produto` | Módulo de produtos |
| `npm run test:fornecedor` | Módulo de fornecedores |
| `npm run e2e` | Todos os testes E2E (Playwright) |
| `npm run e2e:produto` | Testes E2E do módulo produto |

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── base-components/        # FormBaseComponent (validação reutilizável)
│   ├── conta/                  # Login, Cadastro, Guards, ContaService
│   ├── fornecedor/             # CRUD fornecedores + endereços + lista-produtos
│   ├── navegacao/              # Menu, MenuLogin, Footer, Home, NotFound
│   ├── produto/                # CRUD produtos + upload de imagem
│   ├── services/               # AuthInterceptor, ErrorInterceptor, AuthStateService, BaseGuard
│   └── utils/                  # StringUtils, CurrencyUtils, DocumentoPipe, LocalStorageUtils
├── environments/
│   ├── environment.ts                      # Produção (gitignored)
│   ├── environment.development.ts          # Desenvolvimento (gitignored)
│   └── environment.development.ts.example # Template para novos devs
e2e/
├── playwright.config.ts
└── src/
    ├── app.base.po.ts
    └── cadastro-produto/
```

---

## Padrões Modernos Adotados (Angular 21)

### Control Flow Syntax
```html
<!-- Antes (Angular 8) -->
<div *ngIf="logado">...</div>
<tr *ngFor="let item of lista">...</tr>

<!-- Agora (Angular 21) -->
@if (logado()) { <div>...</div> }
@for (item of lista(); track item.id) { <tr>...</tr> } @empty { ... }
```

### Signals
```ts
// Estado local reativo sem BehaviorSubject
readonly errors = signal<string[]>([]);
readonly logado = computed(() => !!this.token());
```

### Injeção com inject()
```ts
// Sem constructor injection
private readonly service = inject(MyService);
```

### Functional Guards e Resolvers
```ts
export const meuGuard: CanActivateFn = (route) => inject(GuardService).canActivate(route);
export const meuResolver: ResolveFn<Entidade> = (route) =>
  inject(Service).obterPorId(route.params['id']);
```

### HTTP Interceptors
- `authInterceptor` — adiciona `Authorization: Bearer <token>` em todas as requisições à API
- `errorInterceptor` — trata 401 (→ login) e 403 (→ acesso negado) globalmente

---

## Bibliotecas

| Biblioteca | Versão | Uso |
|---|---|---|
| `@angular/ssr` | 21.x | Server-Side Rendering + hidratação |
| `@ng-bootstrap/ng-bootstrap` | 20.x | Modal (edição de endereço) |
| `ngx-toastr` | 20.x | Notificações |
| `ngx-spinner` | 21.x | Loading spinner |
| `ngx-mask` | 21.x | Máscara de valor monetário |
| `@playwright/test` | 1.60.x | Testes E2E |

---

## Testes Unitários

Runner: **Vitest** integrado ao Angular CLI via `@angular/build:unit-test`.

```bash
npm test              # todos os testes (78)
npm run test:watch    # modo watch — re-executa ao salvar
```

### Por categoria

```bash
npm run test:utils        # CustomFormValidators + GenericValidator
npm run test:services     # authInterceptor, errorInterceptor, AuthStateService, BaseGuard
npm run test:conta        # Login, Cadastro, ContaService, loginGuard, cadastroGuard
npm run test:produto      # ListaComponent, NovoComponent, DetalhesComponent
npm run test:fornecedor   # ListaComponent, NovoComponent, FornecedorService (+ ViaCEP)
```

### Cobertura por área

| Área | Casos cobertos |
|---|---|
| `CustomFormValidators` | `rangeLength`: vazio, dentro do range, abaixo, acima. `matchValues`: iguais, diferentes, parent null |
| `GenericValidator` | Campo pristine, tocado inválido, tocado válido, controle sem mensagem, FormGroup aninhado |
| `AuthStateService` | Signals `logado`/`email`/`token`, `atualizar()`, `limpar()`, inicialização via localStorage |
| `authInterceptor` | Adiciona Bearer token, sem token, URL externa (ViaCEP), plataforma server (SSR) |
| `errorInterceptor` | 401 → limpa auth + redireciona login; 403 → acesso-negado; outros erros propagados |
| `BaseGuard` | Sem token, com token sem claim, claim tipo errado, valor errado, claim correta |
| `loginGuard` | Redireciona para `/home` se já logado, permite acesso se não logado |
| `cadastroGuard` | Permite saída sem mudanças; chama `confirm()` com mudanças; respeita cancelamento |
| `ContaService` | POST `/nova-conta`, POST `/entrar`, `salvarResponseUsuario` (token + usuário no localStorage) |
| `FornecedorService` | GET todos, GET por ID, POST, PUT, DELETE, `consultarCep` (sucesso e erro) |

---

## Testes E2E

```bash
# Certifique-se de que o app está rodando: npm start

npm run e2e           # todos os testes
npm run e2e:produto   # apenas produto

# Modo visual (browser visível)
npx playwright test --config=e2e/playwright.config.ts --headed

# Relatório HTML após execução
npx playwright show-report
```

---

## Segurança de Chaves

O arquivo `src/environments/environment.development.ts` está no `.gitignore`.  
**Nunca commite chaves de API.** Use o arquivo `.example` como referência.

```bash
# Verificar se o arquivo está sendo rastreado (não deve estar)
git check-ignore -v src/environments/environment.development.ts
```
