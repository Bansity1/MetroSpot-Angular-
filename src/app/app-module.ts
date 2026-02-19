import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './shared/modules/layout/navbar/navbar';
import { Footer } from './shared/modules/layout/footer/footer';
import { AuthModal } from './shared/modules/layout/auth-modal/auth-modal';

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    AuthModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
