import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  activeForm: 'contact' | 'suggest' = 'contact';

  showContactForm(): void {
    this.activeForm = 'contact';
  }

  showSuggestForm(): void {
    this.activeForm = 'suggest';
  }

  onContactSubmit(event: Event): void {
    event.preventDefault();
    console.log('Contact form submitted');
  }

  onSuggestSubmit(event: Event): void {
    event.preventDefault();
    console.log('Suggest form submitted');
  }
}