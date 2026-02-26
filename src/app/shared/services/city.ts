import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityShowcase } from '../../shared/model/city.model';
import { CityData } from '../../shared/model/city.model';

@Injectable({
  providedIn: 'root',
})
export class City {
  private readonly http = inject(HttpClient);
  private apiURL = 'http://localhost:3000';
  
  getCityByName(cityName: string): Observable<CityData | undefined> {
    return this.http.get<CityData[]>(`${this.apiURL}/cities?id=${cityName}`)
      .pipe(map(cities => cities[0])
    );
  }

  getShowcaseCities(): Observable<CityShowcase[]> {
    return this.http.get<CityShowcase[]>(`${this.apiURL}/cityShowcase`).pipe(
      map(response => response.filter((city: any) => city.isPopular))
    );
  }

  getFeaturedCities(): Observable<CityShowcase[]> {
    return this.http.get<CityShowcase[]>(`${this.apiURL}/cityShowcase`).pipe(
      map(response => response.filter((city: any) => !city.isPopular))
    );
  }
}