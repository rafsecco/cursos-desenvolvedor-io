import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { BaseService } from '@services/base.service';
import { AuthStateService } from '@services/auth-state.service';
import { LoginResponse } from '../models/login-response';
import { LoginUsuario } from '../models/login-usuario';
import { RegistroUsuario } from '../models/registro-usuario';

@Injectable({
  providedIn: 'root',
})
export class ContaService extends BaseService {
  private readonly http = inject(HttpClient);
  private readonly authState = inject(AuthStateService);

  registrarUsuario(usuario: RegistroUsuario): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.urlServiceV1}nova-conta`, usuario, this.obterHeaderJson())
      .pipe(catchError((error) => this.serviceError(error)));
  }

  login(usuario: LoginUsuario): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.urlServiceV1}entrar`, usuario, this.obterHeaderJson())
      .pipe(catchError((error) => this.serviceError(error)));
  }

  salvarResponseUsuario(response: LoginResponse): void {
    this.localStorageUtils.salvarDadosLocaisUsuario(response);
    this.authState.atualizar(response);
  }
}
