import { Routes } from '@angular/router';
import { ProdutoService } from './services/produto.service';
import { produtoResolve } from './services/produto.resolve';

export const PRODUTO_ROUTES: Routes = [
  {
    path: '',
    providers: [ProdutoService],
    loadComponent: () => import('./produto-app').then((m) => m.ProdutoAppComponent),

    children: [
      { path: '', redirectTo: 'todos', pathMatch: 'full' },

      {
        path: ':estado/editar/:id',
        loadComponent: () =>
          import('./editar-produto/editar-produto').then((m) => m.EditarProduto)
      },

      {
        path: ':estado',
        loadComponent: () =>
          import('./produto-dashboard/produto-dashboard').then((m) => m.ProdutoDashboard),

        resolve: { produtos: produtoResolve },
        data: { teste: 'informação' },

        // 🔥 ISSO EVITA BUG COM PARAMETRO
        runGuardsAndResolvers: 'paramsChange'
      }
    ]
  }
];
