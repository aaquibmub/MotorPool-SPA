/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripBookingStartNowEditComponent } from './trip-booking-start-now-edit.component';

describe('TripBookingStartNowEditComponent', () => {
  let component: TripBookingStartNowEditComponent;
  let fixture: ComponentFixture<TripBookingStartNowEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBookingStartNowEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBookingStartNowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
