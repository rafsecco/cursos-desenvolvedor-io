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
| `npm test` | Testes unitários com Vitest |
| `npm run e2e` | Todos os testes E2E (Playwright) |
| `npm run e2e:produto` | Testes do módulo produto |

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
│   ├── environment.ts                      # Produção (commitado, sem chaves)
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
