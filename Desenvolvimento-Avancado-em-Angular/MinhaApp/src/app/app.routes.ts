import { Routes } from '@angular/router';
import { Home } from './navegacao/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // carregamento imediato
  { path: 'home', component: Home },

  // lazy loading
  { path: 'sobre',loadComponent: () => import('./institucional/sobre/sobre').then((m) => m.Sobre) },
  { path: 'contato', loadComponent: () => import('./institucional/contato/contato').then((m) => m.Contato) },
  { path: 'cadastro', loadComponent: () => import('./demos/reactiveForms/cadastro/cadastro').then((m) => m.Cadastro) },
  { path: 'form-dinamico', loadComponent: () => import('./demos/reactiveForms/dynamic-form/components/dynamic-form.component').then((m) => m.DynamicFormComponent) },
];
