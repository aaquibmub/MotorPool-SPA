/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsMilageOpmTodayComponent } from './report-trips-milage-opm-today.component';

describe('ReportTripsMilageOpmTodayComponent', () => {
  let component: ReportTripsMilageOpmTodayComponent;
  let fixture: ComponentFixture<ReportTripsMilageOpmTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsMilageOpmTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsMilageOpmTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
