/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardHomeTripMilageChartComponent } from './dashboard-home-trip-milage-chart.component';

describe('DashboardHomeTripMilageChartComponent', () => {
  let component: DashboardHomeTripMilageChartComponent;
  let fixture: ComponentFixture<DashboardHomeTripMilageChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHomeTripMilageChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHomeTripMilageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
