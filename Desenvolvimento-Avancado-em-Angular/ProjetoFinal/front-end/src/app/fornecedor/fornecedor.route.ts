import { Routes } from '@angular/router';
import { FornecedorAppComponent } from './fornecedor.app';
import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { fornecedorResolver } from './services/fornecedor.resolve';
import { fornecedorCanActivate, fornecedorCanDeactivate } from './services/fornecedor.guard';

export const fornecedorRouterConfig: Routes = [
  {
    path: '',
    component: FornecedorAppComponent,
    children: [
      { path: 'listar-todos', component: ListaComponent },
      {
        path: 'adicionar-novo',
        component: NovoComponent,
        canActivate: [fornecedorCanActivate],
        canDeactivate: [fornecedorCanDeactivate],
        data: { claim: { nome: 'Fornecedor', valor: 'Adicionar' } },
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [fornecedorCanActivate],
        resolve: { fornecedor: fornecedorResolver },
        data: { claim: { nome: 'Fornecedor', valor: 'Atualizar' } },
      },
      {
        path: 'detalhes/:id',
        component: DetalhesComponent,
        resolve: { fornecedor: fornecedorResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirComponent,
        canActivate: [fornecedorCanActivate],
        resolve: { fornecedor: fornecedorResolver },
        data: { claim: { nome: 'Fornecedor', valor: 'Excluir' } },
      },
    ],
  },
];
