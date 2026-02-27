import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place, SavedPlace } from '../model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'metrospot_favorites';
  private favoritesSubject = new BehaviorSubject<SavedPlace[]>(this.loadFromStorage());

  favorites$ = this.favoritesSubject.asObservable();

  private loadFromStorage(): SavedPlace[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(favorites: SavedPlace[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  }

  getAll(): SavedPlace[] {
    return this.favoritesSubject.getValue();
  }

  isSaved(placeName: string | undefined): boolean {
    if (!placeName) return false;
    return this.getAll().some(p => p.name === placeName);
  }

  toggle(place: Place, cityName: string) {
    const current = this.getAll();
    const index = current.findIndex(p => p.name === place.name);
    let updated: SavedPlace[];

    if (index > -1) {
      updated = current.filter((_, i) => i !== index);
    } else {
      updated = [...current, { ...place, cityName, savedAt: new Date() }];
    }

    this.favoritesSubject.next(updated);
    this.saveToStorage(updated);
  }

  remove(placeName: string | undefined) {
    if (!placeName) return;
    const updated = this.getAll().filter(p => p.name !== placeName);
    this.favoritesSubject.next(updated);
    this.saveToStorage(updated);
  }
}