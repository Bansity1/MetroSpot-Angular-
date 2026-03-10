import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { LoginCredentials, RegisterCredentials } from '../../../model/model';
import { AUTH_MODAL } from '../../../constants';

@Component({
  selector: 'app-auth-modal',
  standalone: false,
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.scss',
})
export class AuthModal {  

  labels = AUTH_MODAL.LABELS;
  icons = AUTH_MODAL.ICONS;
  
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  private authService = inject(AuthService);

  isLoginMode = true;
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.resetForm();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = { email: this.email, password: this.password };

    const authObservable = this.isLoginMode 
      ? this.authService.login(credentials)
      : this.authService.register(credentials);

    authObservable.subscribe({
      next: (response) => {
        console.log('Auth successful:', response);
        this.isLoading = false;
        this.close();
      },
      error: (error) => {
        console.error('Auth error:', error);
        this.errorMessage = error.message || 'An error occurred';
        this.isLoading = false;
      }
    });
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.isLoading = false;
    this.isLoginMode = true;
  }
}