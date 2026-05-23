import { inject } from '@angular/core';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageUtils } from '@utils/localstorage';
import { AuthStateService } from './auth-state.service';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);
  const localStorageUtils = inject(LocalStorageUtils);
  const authState = inject(AuthStateService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          localStorageUtils.limparDadosLocaisUsuario();
          authState.limpar();
          router.navigate(['/conta/login'], {
            queryParams: { returnUrl: router.url },
          });
        }

        if (error.status === 403) {
          router.navigate(['/acesso-negado']);
        }
      }

      return throwError(() => error);
    }),
  );
}
