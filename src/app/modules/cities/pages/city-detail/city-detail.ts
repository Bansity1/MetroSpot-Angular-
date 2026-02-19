import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { City } from '../../../../shared/services/city';
import { Category, CityData, Place } from '../../../../shared/model';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.html',
  standalone: false,
  styleUrls: ['./city-detail.scss']
})
export class CityDetail implements OnInit {
  cityName: string = '';
  cityData: CityData | null = null;
  activeCategory = 'about';
  selectedPlace: Place | null = null;
  categories: Category[] = [];
  places: Place[] = [];

  constructor(
    private route: ActivatedRoute,
    private cityService: City,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    console.log('CityDetail constructor called');
  }

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
    this.selectedPlace = { ...place };
  }

  closeModal() {
    this.selectedPlace = null;
  }

  getSafeMapUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  saveToFavorites() {
    if (!this.selectedPlace) return;

    let favorites = JSON.parse(localStorage.getItem('myFavorites') || '[]');
    const exists = favorites.find((f: any) => f.name === this.selectedPlace?.name);

    if (!exists) {
      favorites.push(this.selectedPlace);
      localStorage.setItem('myFavorites', JSON.stringify(favorites));
      alert('Saved to favorites!');
    } else {
      alert('Already in favorites.');
    }

    this.closeModal();
  }
}