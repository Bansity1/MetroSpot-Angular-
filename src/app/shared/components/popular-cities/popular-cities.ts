import { Component, input } from '@angular/core';

@Component({
  selector: 'app-popular-cities',
  standalone: false,
  templateUrl: './popular-cities.html',
  styleUrl: './popular-cities.scss',
})
export class PopularCities {

  name = input.required<string>();
  description = input.required<string>();
  code = input.required<string>();
}
