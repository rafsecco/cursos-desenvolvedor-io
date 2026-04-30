import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      ...(isDevMode() ? [withDebugTracing()] : [])
    ),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
