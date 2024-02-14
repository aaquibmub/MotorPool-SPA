/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReportDriverDutiesComponent } from './report-driver-duties.component';

describe('ReportDriverDutiesComponent', () => {
  let component: ReportDriverDutiesComponent;
  let fixture: ComponentFixture<ReportDriverDutiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDriverDutiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDriverDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
