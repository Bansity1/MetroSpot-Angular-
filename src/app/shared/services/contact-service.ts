import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private apiURL = 'http://localhost:3000';

  submitContact(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/contacts`, data);
  }

  submitSuggestion(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/suggestions`, data);
  }
}