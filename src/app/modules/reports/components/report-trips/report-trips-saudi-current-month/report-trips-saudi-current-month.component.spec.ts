/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsSaudiCurrentMonthComponent } from './report-trips-saudi-current-month.component';

describe('ReportTripsSaudiCurrentMonthComponent', () => {
  let component: ReportTripsSaudiCurrentMonthComponent;
  let fixture: ComponentFixture<ReportTripsSaudiCurrentMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsSaudiCurrentMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsSaudiCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
