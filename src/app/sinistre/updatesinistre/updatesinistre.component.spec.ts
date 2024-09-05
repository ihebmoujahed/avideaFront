import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesinistreComponent } from './updatesinistre.component';

describe('UpdatesinistreComponent', () => {
  let component: UpdatesinistreComponent;
  let fixture: ComponentFixture<UpdatesinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesinistreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
