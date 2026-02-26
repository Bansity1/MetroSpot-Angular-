import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('metrospot-ang');
  showFooter = false;

  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showFooter =
          event.urlAfterRedirects === '/' ||
          event.urlAfterRedirects === '/about';
      });
}}
