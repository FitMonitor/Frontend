import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import {JwtModule} from "@auth0/angular-jwt";
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(),
    importProvidersFrom([
      // ...
        JwtModule.forRoot({
          config: {
            tokenGetter: () => localStorage.getItem('token')
          }
        })
      ])
  ]
};
