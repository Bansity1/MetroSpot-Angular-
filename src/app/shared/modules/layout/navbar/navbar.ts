import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { NAVBAR } from '../../../constants';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  
  labels = NAVBAR.LABELS;
  icons = NAVBAR.ICONS;
  altText = NAVBAR.ALT_TEXT;
  
  showAuthModal = false;
  showProfileDropdown = false;
  mobileMenuOpen = false;
  isLoggedIn = false;
  userEmail = '';

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.user.email || '';
    });
  }

  openAuthModal(event: Event) {
    event.preventDefault();
    this.showAuthModal = true;
  }

  toggleProfileDropdown(event: Event) {
    event.preventDefault();
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  logout() {
    this.authService.logout();
    this.showProfileDropdown = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}