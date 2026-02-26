import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { City } from '../../../../shared/services/city';

@Component({
  selector: 'app-cities',
  standalone: false,
  templateUrl: './cities.html',
  styleUrl: './cities.scss',
})
export class Cities implements OnInit {

  private readonly cityService = inject(City);
  private readonly cdr = inject(ChangeDetectorRef);

  showcaseCities: any[] = [];
  regularCities: any[] = [];

  ngOnInit() {
    this.loadCityData();
  }

  loadCityData() {
    this.cityService.getShowcaseCities().subscribe({
      next: (cityList) => {
        console.log('Showcase cities loaded:', cityList);
        this.showcaseCities = cityList;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading showcase cities:', error);
      }
    });

    this.cityService.getFeaturedCities().subscribe({
      next: (cityList) => {
        console.log('Featured cities loaded:', cityList);
        this.regularCities = cityList;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading featured cities:', error);
      }
    });
  }
}