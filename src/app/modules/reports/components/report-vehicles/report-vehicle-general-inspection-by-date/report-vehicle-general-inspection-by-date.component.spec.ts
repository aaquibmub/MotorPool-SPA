/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportVehicleGeneralInspectionByDateComponent } from './report-vehicle-general-inspection-by-date.component';

describe('ReportVehicleGeneralInspectionByDateComponent', () => {
  let component: ReportVehicleGeneralInspectionByDateComponent;
  let fixture: ComponentFixture<ReportVehicleGeneralInspectionByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVehicleGeneralInspectionByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVehicleGeneralInspectionByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
