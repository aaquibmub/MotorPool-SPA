/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardHomeActiveDriversComponent } from './dashboard-home-active-drivers.component';

describe('DashboardHomeActiveDriversComponent', () => {
  let component: DashboardHomeActiveDriversComponent;
  let fixture: ComponentFixture<DashboardHomeActiveDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHomeActiveDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHomeActiveDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
