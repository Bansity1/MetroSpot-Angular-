import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesRoutingModule } from './favorites-routing-module';
import { Favorites } from './pages/favorites/favorites';

@NgModule({
  declarations: [
    Favorites
  ],
  imports: [
    CommonModule,
    FormsModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
