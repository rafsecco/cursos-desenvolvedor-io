import { Routes } from '@angular/router';
import { Home } from './navegacao/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // carregamento imediato
  { path: 'home', component: Home },

  // lazy loading
  { path: 'sobre',loadComponent: () => import('./institucional/sobre/sobre').then((m) => m.Sobre) },
  { path: 'contato', loadComponent: () => import('./institucional/contato/contato').then((m) => m.Contato) },
  { path: 'feature-data-binding', loadComponent: () => import('./demos/data-binding/data-binding').then((m) => m.DataBinding) },
  { path: 'produtos', loadComponent: () => import('./produtos/lista-produto/lista-produto').then((m) => m.ListaProduto) },
  { path: 'produto-detalhe/:id', loadComponent: () => import('./produtos/lista-produto/lista-produto').then((m) => m.ListaProduto) },
];
