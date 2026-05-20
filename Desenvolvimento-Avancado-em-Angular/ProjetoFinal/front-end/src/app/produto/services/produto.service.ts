import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BaseService } from '@services/base.service';
import { Produto, Fornecedor } from '../models/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService extends BaseService {
  private readonly http = inject(HttpClient);

  obterTodos(): Observable<Produto[]> {
    return this.http
      .get<Produto[]>(`${this.urlServiceV1}produtos`)
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Produto> {
    return this.http
      .get<Produto>(`${this.urlServiceV1}produtos/${id}`)
      .pipe(catchError(super.serviceError));
  }

  novoProduto(produto: Produto): Observable<Produto> {
    return this.http
      .post<Produto>(`${this.urlServiceV1}produtos`, produto)
      .pipe(catchError(super.serviceError));
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http
      .put<Produto>(`${this.urlServiceV1}produtos/${produto.id}`, produto)
      .pipe(catchError(super.serviceError));
  }

  excluirProduto(id: string): Observable<Produto> {
    return this.http
      .delete<Produto>(`${this.urlServiceV1}produtos/${id}`)
      .pipe(catchError(super.serviceError));
  }

  obterFornecedores(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(`${this.urlServiceV1}fornecedores`)
      .pipe(catchError(super.serviceError));
  }
}
