import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from './fornecedor.service';

export const fornecedorResolver: ResolveFn<Fornecedor> = (route) =>
  inject(FornecedorService).obterPorId(route.params['id']);
