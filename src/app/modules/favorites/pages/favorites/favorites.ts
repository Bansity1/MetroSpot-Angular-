import { Component, OnInit, inject } from '@angular/core';
import { FavoritesService } from '../../../../shared/services/favorite-service';
import { FAVORITES } from '../../../../shared/constants/index';
import { SavedPlace } from '../../../../shared/model/model';
@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  private readonly favoritesService = inject(FavoritesService);

  labels = FAVORITES.LABELS;
  
  allFavorites: SavedPlace[] = [];
  filteredFavorites: SavedPlace[] = [];
  activeFilter: string = 'all';
  sortOrder: string = 'recent';

  filters = [
    { key: 'all', label: 'All' },
    { key: 'food', label: '🍴 Food & Drink' },
    { key: 'date', label: '❤️ Date Spots' },
    { key: 'chill', label: '🌿 Chill / Unwind' },
    { key: 'picture', label: '📸 Instagrammable' },
    { key: 'hidden', label: '💎 Hidden Gems' },
  ];

  ngOnInit() {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.allFavorites = favorites;
      this.applyFilter();
    });
  }

  applyFilter() {
    let result = this.activeFilter === 'all'
      ? [...this.allFavorites]
      : this.allFavorites.filter(p => p.category === this.activeFilter);

    if (this.sortOrder === 'recent') {
      result.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredFavorites = result;
  }

  setFilter(key: string) {
    this.activeFilter = key;
    this.applyFilter();
  }

  setSortOrder(order: string) {
    this.sortOrder = order;
    this.applyFilter();
  }

  removeSpot(place: SavedPlace) {
    this.favoritesService.remove(place.name);
  }

  
  getCategoryLabel(key: string): string {
    const map: Record<string, string> = {
      food: 'Food & Drink',
      date: 'Date Spots',
      chill: 'Chill / Unwind',
      picture: 'Instagrammable',
      hidden: 'Hidden Gems',
    };
    return map[key] || key;
  }

  get stats() {
    const total = this.allFavorites.length;
    const cityCounts: Record<string, number> = {};
    const catCounts: Record<string, number> = {};

    this.allFavorites.forEach(p => {
      cityCounts[p.cityName] = (cityCounts[p.cityName] || 0) + 1;
      catCounts[p.category] = (catCounts[p.category] || 0) + 1;
    });

    const topCity = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0];
    const topCat = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      total,
      topCity: topCity ? `${topCity[0]} (${topCity[1]})` : '—',
      topCategory: topCat ? this.getCategoryLabel(topCat[0]) : '—',
    };
  }

}