import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsinistreComponent } from './detailsinistre.component';

describe('DetailsinistreComponent', () => {
  let component: DetailsinistreComponent;
  let fixture: ComponentFixture<DetailsinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsinistreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
