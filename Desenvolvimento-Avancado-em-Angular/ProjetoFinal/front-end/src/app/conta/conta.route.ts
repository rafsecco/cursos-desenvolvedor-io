import { Routes } from '@angular/router';

import { cadastroGuard, loginGuard } from './services/conta.guard';

export const CONTA_ROUTES: Routes = [
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro').then((m) => m.Cadastro),
    canActivate: [loginGuard],
    canDeactivate: [cadastroGuard],
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
    canActivate: [loginGuard],
  },
];
