import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from './produto.service';

export const produtoResolver: ResolveFn<Produto> = (route) =>
  inject(ProdutoService).obterPorId(route.params['id']);
