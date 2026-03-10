import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/modules/layout/navbar/navbar';
import { Footer } from './shared/modules/layout/footer/footer';
import { AuthModal } from './shared/modules/layout/auth-modal/auth-modal';
import { authInterceptor } from './shared/interceptors/auth-interceptor';

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    AuthModal
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }