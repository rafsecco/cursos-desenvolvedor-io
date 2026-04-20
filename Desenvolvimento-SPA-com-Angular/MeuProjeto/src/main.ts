import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'; // Use 'pt' instead of 'pt-br'

registerLocaleData(localePt);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
