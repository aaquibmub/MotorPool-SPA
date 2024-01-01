/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportVehicleBodyInspectionComponent } from './report-vehicle-body-inspection.component';

describe('ReportVehicleBodyInspectionComponent', () => {
  let component: ReportVehicleBodyInspectionComponent;
  let fixture: ComponentFixture<ReportVehicleBodyInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVehicleBodyInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVehicleBodyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
