/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportVehicleGeneralInspectionByVehicleComponent } from './report-vehicle-general-inspection-by-vehicle.component';

describe('ReportVehicleGeneralInspectionByVehicleComponent', () => {
  let component: ReportVehicleGeneralInspectionByVehicleComponent;
  let fixture: ComponentFixture<ReportVehicleGeneralInspectionByVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVehicleGeneralInspectionByVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVehicleGeneralInspectionByVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
