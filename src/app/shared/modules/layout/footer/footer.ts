import { Component } from '@angular/core';
import { FOOTER } from '../../../constants';
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  labels = FOOTER.LABELS;
  socialLinks = FOOTER.SOCIAL_LINKS;
}
