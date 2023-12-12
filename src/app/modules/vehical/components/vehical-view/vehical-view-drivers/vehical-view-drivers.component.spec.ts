import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalViewDriversComponent } from './vehical-view-drivers.component';

describe('VehicalViewDriversComponent', () => {
  let component: VehicalViewDriversComponent;
  let fixture: ComponentFixture<VehicalViewDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalViewDriversComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalViewDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
