import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './util/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
  provideBrowserGlobalErrorListeners(),
  provideRouter(routes),
  provideHttpClient(),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ]
};
