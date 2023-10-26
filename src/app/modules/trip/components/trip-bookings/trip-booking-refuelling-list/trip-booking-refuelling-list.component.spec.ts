/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripBookingRefuellingListComponent } from './trip-booking-refuelling-list.component';

describe('TripBookingRefuellingListComponent', () => {
  let component: TripBookingRefuellingListComponent;
  let fixture: ComponentFixture<TripBookingRefuellingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBookingRefuellingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBookingRefuellingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
