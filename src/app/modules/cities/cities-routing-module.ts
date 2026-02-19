import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cities } from './pages/cities/cities';
import { CityDetail } from './pages/city-detail/city-detail';

const routes: Routes = [
  { path: '', component: Cities},
  { path: ':cityName', component: CityDetail }  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
