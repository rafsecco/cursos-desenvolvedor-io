import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

/*
⚙️ Como o app.routes.server.ts funciona

Quando alguém acessa sua aplicação:

O servidor Angular renderiza a página primeiro (HTML pronto)
Ele usa as rotas definidas em app.routes.server.ts
Depois o Angular no browser assume (hydration)

Ou seja:

O server usa app.routes.server.ts
O client usa app.routes.ts
🧩 Pra que isso serve na prática?

Você pode usar o arquivo server para coisas como:

1. Redirecionamentos específicos no servidor

Exemplo: evitar renderizar certas rotas no SSR

2. Rotas que só fazem sentido no server

Tipo:

autenticação inicial
pré-carregamento de dados críticos
3. SEO melhor

Você pode garantir que certas páginas sejam renderizadas já com conteúdo completo

📌 Exemplo simplificado
```
// app.routes.server.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
  },
  {
    path: 'admin',
    redirectTo: '' // evita renderizar admin no SSR
  }
];
```
⚠️ Importante
Se você não estiver usando SSR ativamente, pode praticamente ignorar esse arquivo — o Angular ainda funciona normalmente só com app.routes.ts.
*/
