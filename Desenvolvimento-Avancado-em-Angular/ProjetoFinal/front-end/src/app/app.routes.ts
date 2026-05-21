import { Routes } from '@angular/router';
import { Home } from './navegacao/home/home';
import { NotFound } from './navegacao/not-found/not-found';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado';

export const routes: Routes = [
  // carregamento imediato
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },

  // lazy loading - rotas com children (subrotas)
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.route').then((m) => m.CONTA_ROUTES),
  },
  {
    path: 'fornecedores',
    loadChildren: () =>
      import('./fornecedor/fornecedor.route').then((m) => m.fornecedorRouterConfig),
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./produto/produto.route').then((m) => m.produtoRouterConfig),
  },

  { path: 'nao-encontrado', component: NotFound },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', component: NotFound }, // Sempre por ultimo
];
