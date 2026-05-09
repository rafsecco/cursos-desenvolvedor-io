import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Usuario } from '../models/usuario';

import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ContaService extends BaseService {
  private readonly http = inject(HttpClient);

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.UrlServiceV1}nova-conta`, usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.UrlServiceV1}entrar`, usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));
  }
}
