import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { City } from '../../../../shared/services/city';
import { CITY_DETAIL } from '../../../../shared/constants/index';
import { Category, CityData, Place } from '../../../../shared/model';
import { FavoritesService } from '../../../../shared/services/favorite-service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.html',
  standalone: false,
  styleUrls: ['./city-detail.scss']
})
export class CityDetail implements OnInit {
  labels = CITY_DETAIL.LABELS;
  
  private readonly route = inject(ActivatedRoute);
  private readonly cityService = inject(City);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly favoritesService = inject(FavoritesService);

  cityName: string = '';
  cityData: CityData | null = null;
  activeCategory = 'about';
  selectedPlace: Place | null = null;
  categories: Category[] = [];
  places: Place[] = [];

  ngOnInit() {
    console.log('ngOnInit called');
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      this.cityName = params['cityName'];
      this.loadCityData();
    });
  }

  loadCityData() {
    console.log('Loading city data for:', this.cityName);
    this.cityService.getCityByName(this.cityName).subscribe({
      next: (data) => {
        console.log('City data received:', data);
        if (data) {
          this.cityData = data;
          this.categories = data.categories || [];
          this.places = data.places || [];
          console.log('Categories:', this.categories);
          console.log('Places:', this.places);
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error loading city data:', err);
      }
    });
  }

  get filteredPlaces(): Place[] {
    if (this.activeCategory === 'about') {
      return [];
    }
    const filtered = this.places.filter(place => place.category === this.activeCategory);
    console.log('Filtered places for category', this.activeCategory, ':', filtered);
    return filtered;
  }

  selectCategory(key: string) {
    console.log('Category selected:', key);
    this.activeCategory = key;
  }

  openPlace(place: Place) {
    this.selectedPlace = place;
    console.log(place, this.selectedPlace)
  }

  closeModal() {
    this.selectedPlace = null;
  }

  getSafeMapUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleSave(place: Place) {
    this.favoritesService.toggle(place, this.cityData?.name || this.cityName);
  }

  isSaved(place: Place): boolean {
    return this.favoritesService.isSaved(place.name);
  }
}