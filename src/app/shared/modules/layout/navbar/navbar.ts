import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
ngOnInit() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');

  burger?.addEventListener('click', () => {
    menu?.classList.toggle('active');
  });
}
  showAuthModal = false;
  mobileMenuOpen = false;

  openAuthModal(event: Event) {
    event.preventDefault();
    this.showAuthModal = true;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}


