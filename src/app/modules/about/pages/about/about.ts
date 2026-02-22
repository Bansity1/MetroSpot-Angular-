import { Component } from '@angular/core';
import { ABOUT } from '../../../../shared/constants';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly hero = ABOUT.HERO;
  readonly aboutSection = ABOUT.ABOUT_SECTION;
  readonly howWorks = ABOUT.HOW_WORKS;
}
