import { Routes } from '@angular/router';
import { Home } from './navegacao/home/home';
import { NotFound } from './navegacao/not-found/not-found';
import { Sobre } from './institucional/sobre/sobre';
import { Contato } from './institucional/contato/contato';
import { authGuard, adminGuard } from './services/app.guard';
import { unsavedChangesGuard } from './services/unsavedChangesGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // carregamento imediato
  { path: 'home', component: Home },
  { path: 'sobre', component: Sobre },
  { path: 'contato', component: Contato, canActivate: [authGuard] },

  // lazy loading - rotas com children (subrotas)
  { path: 'produtos', loadChildren: () => import('./demos/arquitetura-componentes/produto.route').then((m) => m.PRODUTO_ROUTES) },
  { path: 'filmes', loadComponent: () => import('./demos/pipes/filmes/filmes').then((m) => m.Filmes) },
  { path: 'bar', loadComponent: () => import('./demos/bar-di-zones/bar.component').then((m) => m.BarComponent) },
  { path: 'cadastro', loadComponent: () => import('./demos/reactiveForms/cadastro/cadastro').then((m) => m.Cadastro), canDeactivate: [unsavedChangesGuard] },
  { path: 'form-dinamico', loadComponent: () => import('./demos/reactiveForms/dynamic-form/components/dynamic-form.component').then((m) => m.DynamicFormComponent) },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.route')
        .then((m) => m.ADMIN_ROUTES),

    // 🔥 substitui canLoad
    canMatch: [adminGuard],

    // ainda válido
    canActivate: [authGuard]
  },

  { path: '**', component: NotFound }, // Sempre por ultimo
];
