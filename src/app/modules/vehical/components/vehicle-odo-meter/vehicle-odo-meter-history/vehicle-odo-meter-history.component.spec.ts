/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VehicleOdoMeterHistoryComponent } from './vehicle-odo-meter-history.component';

describe('VehicleOdoMeterHistoryComponent', () => {
  let component: VehicleOdoMeterHistoryComponent;
  let fixture: ComponentFixture<VehicleOdoMeterHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleOdoMeterHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleOdoMeterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
