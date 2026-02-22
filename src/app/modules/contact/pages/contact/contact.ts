import { Component } from '@angular/core';
import { CONTACT } from '../../../../shared/constants';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly labels = CONTACT.LABELS;
  readonly contactForm = CONTACT.CONTACT_FORM;
  readonly suggestForm = CONTACT.SUGGEST_FORM;

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