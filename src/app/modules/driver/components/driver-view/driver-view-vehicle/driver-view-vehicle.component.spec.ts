import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverViewVehicleComponent } from './driver-view-vehicle.component';

describe('DriverViewVehicleComponent', () => {
  let component: DriverViewVehicleComponent;
  let fixture: ComponentFixture<DriverViewVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverViewVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverViewVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
