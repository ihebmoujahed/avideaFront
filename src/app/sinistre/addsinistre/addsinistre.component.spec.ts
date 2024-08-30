import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsinistreComponent } from './addsinistre.component';

describe('AddsinistreComponent', () => {
  let component: AddsinistreComponent;
  let fixture: ComponentFixture<AddsinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsinistreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
