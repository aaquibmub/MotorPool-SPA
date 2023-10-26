/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripBookingRefuellingEditComponent } from './trip-booking-refuelling-edit.component';

describe('TripBookingRefuellingEditComponent', () => {
  let component: TripBookingRefuellingEditComponent;
  let fixture: ComponentFixture<TripBookingRefuellingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBookingRefuellingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBookingRefuellingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
