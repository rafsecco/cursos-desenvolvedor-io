import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { BAR_UNIDADE_CONFIG, CONFIG_MANUAL_UNIDADE } from './demos/bar-di-zones/bar.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      ...(isDevMode() ? [withDebugTracing()] : [])
    ),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: BAR_UNIDADE_CONFIG,
      useValue: { unidadeId: 1, unidadeToken: 'ABC' }
    },
    {
      provide: CONFIG_MANUAL_UNIDADE,
      useValue: { unidadeId: 2, unidadeToken: 'XYZ' }
    }
  ]
};
