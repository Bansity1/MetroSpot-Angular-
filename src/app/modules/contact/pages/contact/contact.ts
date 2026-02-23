import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  contactFormGroup!: FormGroup;
  suggestFormGroup!: FormGroup;

  private apiURL = 'http://localhost:3000';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.initForms();
  }

  private initForms(): void {
    this.contactFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    this.suggestFormGroup = this.fb.group({
      placeName: ['', Validators.required],
      city: [''],
      reason: ['', Validators.required]
    });
  }

  showContactForm(): void {
    this.activeForm = 'contact';
  }

  showSuggestForm(): void {
    this.activeForm = 'suggest';
  }

  onContactSubmit(): void {
    if (this.contactFormGroup.valid) {
      this.http.post(`${this.apiURL}/contacts`,this.contactFormGroup.value)
      .subscribe({
        next: (response) => {
          console.log('Contact submitted:', response);
          alert('Thank you for contacting us!');
          this.contactFormGroup.reset();
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  onSuggestSubmit(): void {
    if (this.suggestFormGroup.valid) {
      this.http.post(`${this.apiURL}/suggestions`, this.suggestFormGroup.value)
        .subscribe({
          next: (response) => {
            console.log('Suggestion submitted:', response);
            alert('Thank you for your suggestion!');
            this.suggestFormGroup.reset();
          },
          error: (error) => console.error('Error:', error)
        });
    }
  }
}