import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { environment } from '@env/environment';
import { LocalStorageUtils } from '@utils/localstorage';

export abstract class BaseService {
  protected readonly localStorageUtils = new LocalStorageUtils();

  protected readonly urlServiceV1 = environment.apiUrlv1;

  protected obterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected obterAuthHeaderJson() {
    const token = this.localStorageUtils.obterTokenUsuario();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      }),
    };
  }

  protected serviceError(response: HttpErrorResponse): Observable<never> {
    const customErrors: string[] = [];

    if (!navigator.onLine) {
      customErrors.push('Você está sem conexão com a internet.');
    }

    switch (response.status) {
      case 0:
        customErrors.push('Não foi possível conectar ao servidor.');
        break;

      case 500:
        customErrors.push(
          'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o suporte.',
        );
        break;
    }

    const errors =
      customErrors.length > 0 ? customErrors : (response.error?.errors ?? ['Erro inesperado']);

    if (isDevMode()) {
      console.error('HTTP ERROR =>', response);
      console.error('Erros da API:', errors);
    }

    return throwError(() => ({
      error: {
        errors,
      },
    }));
  }
}
