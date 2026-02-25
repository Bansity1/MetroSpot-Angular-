import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface SuggestionData {
  placeName: string;
  city: string;
  reason: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  submitContact(data: ContactData): Observable<any> {
    return this.http.post(`${this.apiURL}/contacts`, data);
  }

  submitSuggestion(data: SuggestionData): Observable<any> {
    return this.http.post(`${this.apiURL}/suggestions`, data);
  }
}