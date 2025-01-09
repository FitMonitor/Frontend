import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import {JwtModule} from "@auth0/angular-jwt";
import { importProvidersFrom } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
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


