import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,ValidationErrors, Validators } from '@angular/forms';
import { CONTACT } from '../../../../shared/constants';
import { ContactService } from '../../../../shared/services/contact-service';
@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly labels = CONTACT.LABELS;
  readonly contactForm = CONTACT.CONTACT_FORM;
  readonly suggestForm = CONTACT.SUGGEST_FORM;

  activeForm: 'contact' | 'suggest' = 'contact';

  contactFormGroup!: FormGroup;
  suggestFormGroup!: FormGroup;

  private apiURL = 'http://localhost:3000';

  constructor() {
    this.initForms();
  }

  private noWhitespace(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const isWhitespace = value.trim().length === 0;
    return isWhitespace && value.length > 0 ? { whitespace: true } : null;
  }

  private initForms(): void {
    this.contactFormGroup = this.fb.group({
      name:    ['', [Validators.required, this.noWhitespace]],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, this.noWhitespace]]
    });

    this.suggestFormGroup = this.fb.group({
      placeName: ['', [Validators.required, this.noWhitespace]],
      city:      [''],
      reason:    ['', [Validators.required, this.noWhitespace]]
    });
  }

  trimLeading(controlName: string, formGroup: FormGroup): void {
    const control = formGroup.get(controlName);
    if (!control) return;

    const value: string = control.value;
    const trimmed = value.trimStart();

    if (value !== trimmed) {
      control.setValue(trimmed, { emitEvent: false });
    }
  }

  showContactForm(): void {
    this.activeForm = 'contact';
  }

  showSuggestForm(): void {
    this.activeForm = 'suggest';
  }

  onContactSubmit(): void {
    if (this.contactFormGroup.valid) {
      const trimmed = {
        name:    this.contactFormGroup.value.name.trim(),
        email:   this.contactFormGroup.value.email.trim(),
        message: this.contactFormGroup.value.message.trim(),
      };
      this.contactService.submitContact(trimmed)
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
      const trimmed = {
        placeName: this.suggestFormGroup.value.placeName.trim(),
        city:      this.suggestFormGroup.value.city?.trim(),
        reason:    this.suggestFormGroup.value.reason.trim(),
      };
      this.contactService.submitSuggestion(trimmed)
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



  get name(): AbstractControl | null {return this.contactFormGroup?.get('name')}
  get email(): AbstractControl | null {return this.contactFormGroup?.get('email')}
  get message(): AbstractControl | null {return this.contactFormGroup?.get('message')}

  get placeName(): AbstractControl | null {return this.suggestFormGroup?.get('placeName');}
  get city(): AbstractControl | null {return this.suggestFormGroup?.get('city');}
  get reason(): AbstractControl | null {return this.suggestFormGroup?.get('reason');}
  }