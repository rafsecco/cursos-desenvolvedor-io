import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProdutoService } from './produto.service';

export const produtoResolve: ResolveFn<any> = (route) => {
  const service = inject(ProdutoService);
  const estado = route.paramMap.get('estado')!;

  return service.obterTodos(estado);
};
