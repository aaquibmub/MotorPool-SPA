/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsOpmCurrentMonthComponent } from './report-trips-opm-current-month.component';

describe('ReportTripsOpmCurrentMonthComponent', () => {
  let component: ReportTripsOpmCurrentMonthComponent;
  let fixture: ComponentFixture<ReportTripsOpmCurrentMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsOpmCurrentMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsOpmCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
