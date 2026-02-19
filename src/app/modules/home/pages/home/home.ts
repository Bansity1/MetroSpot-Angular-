import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { City } from '../../../../shared/services/city';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('homeCarousel') carouselElement!: ElementRef;
  
  private bsCarousel: any;
  private interval = 5000;

  slides = [
    { image: 'assets/icons/caro.avif', title: 'MetroSpot', description: 'Discover different spots around Metro Manila' },
    { image: 'assets/icons/cargo.jpg', title: 'Find your next favorite spot', description: 'Tired of jumping between TikTok, Instagram, and blogs?' },
    { image: 'assets/icons/caro1.jpg', title: 'Plan your weekend', description: 'Top events and places' }
  ];

  activeIndex = 0;
  showcaseCities: any[] = [];

  constructor(
    private cityService: City,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCityData();
  }

  loadCityData() {
    this.cityService.getShowcaseCities().subscribe({
      next: (cityList) => {
        this.showcaseCities = cityList.slice(0, 4); 
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading showcase cities:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    const carouselEl = this.carouselElement.nativeElement;
    this.bsCarousel = new bootstrap.Carousel(carouselEl, { interval: this.interval });
    
    this.startFill(0);
    console.log("AfterViewInit")
    carouselEl.addEventListener('slid.bs.carousel', () => {
      const items = Array.from(carouselEl.querySelectorAll('.carousel-item'));
      this.activeIndex = items.findIndex((it: any) => it.classList.contains('active'));
      this.startFill(this.activeIndex >= 0 ? this.activeIndex : 0);
    });
  }

  ngOnDestroy(): void {
    if (this.bsCarousel) {
      this.bsCarousel.dispose();
    }
    console.log("OnDestroy")
  }

  startFill(idx: number): void {
    const lines = document.querySelectorAll('#carouselProgress .progress-line');
    lines.forEach((l) => {
      const fill = l.querySelector('.progress-fill') as HTMLElement;
      if (!fill) return;
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth;
      fill.style.transition = `width ${this.interval}ms linear`;
    });

    const fill = lines[idx]?.querySelector('.progress-fill') as HTMLElement;
    if (fill) fill.style.width = '100%';
  }

  goToSlide(index: number): void {
    this.bsCarousel.to(index);
  }
}