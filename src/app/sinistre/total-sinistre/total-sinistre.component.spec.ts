import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSinistreComponent } from './total-sinistre.component';

describe('TotalSinistreComponent', () => {
  let component: TotalSinistreComponent;
  let fixture: ComponentFixture<TotalSinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSinistreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
