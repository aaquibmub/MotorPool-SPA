/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsMilageSaudiTodayComponent } from './report-trips-milage-saudi-today.component';

describe('ReportTripsMilageSaudiTodayComponent', () => {
  let component: ReportTripsMilageSaudiTodayComponent;
  let fixture: ComponentFixture<ReportTripsMilageSaudiTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsMilageSaudiTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsMilageSaudiTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
