import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopularCities } from './components/popular-cities/popular-cities';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
@NgModule({
  declarations: [
    PopularCities
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxTrimDirectiveModule
  ],
  exports: [
    PopularCities,
    NgxTrimDirectiveModule
  ]
})
export class SharedModule { }