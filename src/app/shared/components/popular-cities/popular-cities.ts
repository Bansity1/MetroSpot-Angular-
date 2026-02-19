import { Component, input } from '@angular/core';

@Component({
  selector: 'app-popular-cities',
  standalone: false,
  templateUrl: './popular-cities.html',
  styleUrl: './popular-cities.scss',
})
export class PopularCities {
  code = input.required<string>();
  name = input.required<string>();
  description = input.required<string>();
  cityType = input<string>('popular-size');
  backgroundImage = input.required<string>();
}