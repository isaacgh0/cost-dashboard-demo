import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/nora';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // * Ng-prime.
    ButtonModule,
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,  
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || "none",
          cssLayer: {
            name: "primeng",
            order: "primeng, tailwind-utilities",
          },
        },
      }}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
