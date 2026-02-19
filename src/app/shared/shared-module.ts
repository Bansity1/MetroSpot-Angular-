import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopularCities } from './components/popular-cities/popular-cities';

@NgModule({
  declarations: [
    PopularCities 
  ],
  imports: [
    CommonModule,
    RouterModule  
  ],
  exports: [
    PopularCities  
  ]
})
export class SharedModule { }