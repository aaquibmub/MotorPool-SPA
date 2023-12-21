/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsMilageOpmCurrentMonthComponent } from './report-trips-milage-opm-current-month.component';

describe('ReportTripsMilageOpmCurrentMonthComponent', () => {
  let component: ReportTripsMilageOpmCurrentMonthComponent;
  let fixture: ComponentFixture<ReportTripsMilageOpmCurrentMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsMilageOpmCurrentMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsMilageOpmCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
