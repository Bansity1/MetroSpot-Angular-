import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { City } from '../../../../shared/services/city';
import { CityShowcase } from '../../../../shared/model';
import { CITIES } from '../../../../shared/constants';
@Component({
  selector: 'app-cities',
  standalone: false,
  templateUrl: './cities.html',
  styleUrl: './cities.scss',
})
export class Cities implements OnInit {

  labels = CITIES.LABELS;
  
  private readonly cityService = inject(City);
  private readonly cdr = inject(ChangeDetectorRef);

  showcaseCities: CityShowcase[] = [];
  regularCities: CityShowcase[] = [];

  ngOnInit() {
    this.loadCityData();
  }

  loadCityData() {
    forkJoin({
      showcase: this.cityService.getShowcaseCities(),
      featured: this.cityService.getFeaturedCities()
    }).subscribe({
      next: (data) => {
        console.log('All cities loaded:', data);
        this.showcaseCities = data.showcase;
        this.regularCities = data.featured;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading cities:', error);
      }
    });
  }
}