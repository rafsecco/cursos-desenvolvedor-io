import { Routes } from '@angular/router';
import { Home } from './navegacao/home/home';
import { NotFound } from './navegacao/not-found/not-found';

export const routes: Routes = [
  // carregamento imediato
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },

  // lazy loading - rotas com children (subrotas)
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.route').then((m) => m.CONTA_ROUTES),
  },

  { path: 'nao-encontrado', component: NotFound },
  { path: '**', component: NotFound } // Sempre por ultimo
];
