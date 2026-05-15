import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import localePt from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor';
import { errorInterceptor } from './services/error.interceptor';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    provideClientHydration(withEventReplay()),
    provideToastr(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
