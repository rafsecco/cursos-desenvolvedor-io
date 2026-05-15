import { inject, PLATFORM_ID } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@env/environment';
import { LocalStorageUtils } from '@utils/localstorage';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) {
    return next(req);
  }

  if (!req.url.startsWith(environment.apiUrlv1)) {
    return next(req);
  }

  const token = inject(LocalStorageUtils).obterTokenUsuario();

  if (!token) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
}
