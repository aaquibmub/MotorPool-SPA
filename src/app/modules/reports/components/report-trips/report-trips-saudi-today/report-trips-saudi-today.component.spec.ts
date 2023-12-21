/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportTripsSaudiTodayComponent } from './report-trips-saudi-today.component';

describe('ReportTripsSaudiTodayComponent', () => {
  let component: ReportTripsSaudiTodayComponent;
  let fixture: ComponentFixture<ReportTripsSaudiTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTripsSaudiTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTripsSaudiTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
