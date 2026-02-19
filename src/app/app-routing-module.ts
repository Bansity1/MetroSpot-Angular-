import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home-module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./modules/about/about-module').then(m => m.AboutModule) },
  { path: 'cities', loadChildren: () => import('./modules/cities/cities-module').then(m => m.CitiesModule) },
  { path: 'contact', loadChildren: () => import('./modules/contact/contact-module').then(m => m.ContactModule) },
  { path: 'favorites', loadChildren: () => import('./modules/favorites/favorites-module').then(m => m.FavoritesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
