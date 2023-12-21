/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsMilageSaudiCurrentMonthComponent } from './report-trips-milage-saudi-current-month.component';

describe('ReportTripsMilageSaudiCurrentMonthComponent', () => {
  let component: ReportTripsMilageSaudiCurrentMonthComponent;
  let fixture: ComponentFixture<ReportTripsMilageSaudiCurrentMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsMilageSaudiCurrentMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsMilageSaudiCurrentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
