import { Routes } from '@angular/router';
import { ProdutoAppComponent } from './produto.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { produtoResolver } from './services/produto.resolve';
import { produtoCanActivate, produtoCanDeactivate } from './services/produto.guard';

export const produtoRouterConfig: Routes = [
  {
    path: '',
    component: ProdutoAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canActivate: [produtoCanActivate],
        canDeactivate: [produtoCanDeactivate],
        data: { claim: { nome: 'Produto', valor: 'Adicionar' } },
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [produtoCanActivate],
        resolve: { produto: produtoResolver },
        data: { claim: { nome: 'Produto', valor: 'Atualizar' } },
      },
      {
        path: 'detalhes/:id',
        component: DetalhesComponent,
        resolve: { produto: produtoResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirComponent,
        canActivate: [produtoCanActivate],
        resolve: { produto: produtoResolver },
        data: { claim: { nome: 'Produto', valor: 'Excluir' } },
      },
    ],
  },
];
