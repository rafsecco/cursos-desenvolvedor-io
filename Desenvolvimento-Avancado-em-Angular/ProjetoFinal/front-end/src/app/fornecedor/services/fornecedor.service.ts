import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BaseService } from '@services/base.service';
import { Fornecedor } from '../models/fornecedor';
import { CepConsulta, Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends BaseService {
  private readonly http = inject(HttpClient);

  novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .post<Fornecedor>(`${this.urlServiceV1}fornecedores`, fornecedor, super.obterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http
      .put<Fornecedor>(
        `${this.urlServiceV1}fornecedores/${fornecedor.id}`,
        fornecedor,
        super.obterAuthHeaderJson(),
      )
      .pipe(catchError(super.serviceError));
  }

  atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http
      .put<Endereco>(
        `${this.urlServiceV1}enderecos/${endereco.id}`,
        endereco,
        super.obterAuthHeaderJson(),
      )
      .pipe(catchError(super.serviceError));
  }

  obterTodos(): Observable<Fornecedor[]> {
    return this.http
      .get<Fornecedor[]>(`${this.urlServiceV1}fornecedores`)
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Fornecedor> {
    return this.http
      .get<Fornecedor>(`${this.urlServiceV1}fornecedores/${id}`, super.obterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  consultarCep(cep: string): Observable<CepConsulta> {
    return this.http
      .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(catchError(super.serviceError));
  }

  excluirFornecedor(id: string): Observable<Fornecedor> {
    return this.http
      .delete<Fornecedor>(`${this.urlServiceV1}fornecedores/${id}`, super.obterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
