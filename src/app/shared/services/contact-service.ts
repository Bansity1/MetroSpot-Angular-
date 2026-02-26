import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactData, SuggestionData } from '../model';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private apiURL = 'http://localhost:3000';

  submitContact(data: ContactData): Observable<ContactData> {
    return this.http.post<ContactData>(`${this.apiURL}/contacts`, data);
  }

  submitSuggestion(data: SuggestionData): Observable<SuggestionData> {
    return this.http.post<SuggestionData>(`${this.apiURL}/suggestions`, data);
  }
}