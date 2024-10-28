import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()), provideClientHydration()]
};
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/'  // Example API base URL for Spring Boot
};


