import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, type Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LocalStorageUtils } from '@utils/localstorage';

export abstract class BaseService {
  protected readonly urlServiceV1 = environment.apiUrlv1;
  protected readonly localStorageUtils = new LocalStorageUtils();

  protected obterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected obterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.localStorageUtils.obterTokenUsuario()}`,
      }),
    };
  }

  /**
   * Tratamento centralizado de erros HTTP
   */
  protected serviceError(response: HttpErrorResponse): Observable<never> {
    const customErrors: string[] = [];

    // Erro de conexão / rede
    if (response.status === 0) {
      customErrors.push('Não foi possível conectar ao servidor.');
    }

    // Erro interno da API
    if (response.status === 500) {
      customErrors.push(
        'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o suporte.',
      );
    }

    if (!navigator.onLine) {
      customErrors.push('Você está sem conexão com a internet.');
    }

    const errorResponse = {
      error: {
        errors:
          customErrors.length > 0 ? customErrors : (response.error?.errors ?? ['Erro inesperado']),
      },
    };

    console.error('HTTP ERROR =>', response);

    return throwError(() => errorResponse);
  }
}
