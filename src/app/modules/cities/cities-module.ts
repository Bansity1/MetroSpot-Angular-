import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CitiesRoutingModule } from './cities-routing-module';
import { Cities } from './pages/cities/cities';
import { CityDetail } from './pages/city-detail/city-detail';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [
    Cities,
    CityDetail
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class CitiesModule { }