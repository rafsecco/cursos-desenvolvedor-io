import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { LocalStorage } from '../utils/localstorage';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
  protected readonly UrlServiceV1 = environment.apiUrlv1;

  public readonly LocalStorage = new LocalStorage();

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
      }),
    };
  }

  protected extractData<T>(response: { data: T }): T {
    return response?.data;
  }

  protected serviceError(response: HttpErrorResponse | any) {
    const customError: string[] = [];

    const customResponse = {
      error: {
        errors: [] as string[],
      },
    };

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');

        response.error.errors = customError;
      }
    }

    if (response.status === 500) {
      customError.push(
        'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.',
      );

      customResponse.error.errors = customError;

      return throwError(() => customResponse);
    }

    console.error(response);

    return throwError(() => response);
  }
}
