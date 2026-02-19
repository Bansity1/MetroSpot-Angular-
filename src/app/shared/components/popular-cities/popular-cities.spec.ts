import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCities } from './popular-cities';

describe('PopularCities', () => {
  let component: PopularCities;
  let fixture: ComponentFixture<PopularCities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularCities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
