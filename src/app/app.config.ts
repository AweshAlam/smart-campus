import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from '../../service/auth.intercepter';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  
      multi: true
    }]
};
export const environment = {
  production: false,
 apiUrl: 'http://localhost:8080/+'  // Example API base URL for Spring Boot
};


