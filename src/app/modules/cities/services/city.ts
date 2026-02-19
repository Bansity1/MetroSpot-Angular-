import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class City {
  private apiURL = 'http://localhost:3000/cities';

  constructor(private http: HttpClient) {}
  
  getCityByName(cityName: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}?id=${cityName}`)
      .pipe(map(cities => cities[0])
  );
}
}