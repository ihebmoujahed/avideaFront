import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecontratComponent } from './updatecontrat.component';

describe('UpdatecontratComponent', () => {
  let component: UpdatecontratComponent;
  let fixture: ComponentFixture<UpdatecontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecontratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
