import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  standalone: false,
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.scss',
})
export class AuthModal {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-profile')) {
      this.close();
    }
  }
}