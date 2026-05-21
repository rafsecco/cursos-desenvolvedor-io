import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Páginas públicas e estáticas — pré-renderizadas em build time
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'conta/login', renderMode: RenderMode.Prerender },
  { path: 'conta/cadastro', renderMode: RenderMode.Prerender },
  { path: 'nao-encontrado', renderMode: RenderMode.Prerender },
  { path: 'acesso-negado', renderMode: RenderMode.Prerender },

  // Rotas autenticadas e/ou com parâmetros dinâmicos — renderizadas no cliente
  // RenderMode.Client: Angular entrega o shell e o browser executa tudo
  { path: '**', renderMode: RenderMode.Client },
];
