/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripBookingVipListComponent } from './trip-booking-vip-list.component';

describe('TripBookingVipListComponent', () => {
  let component: TripBookingVipListComponent;
  let fixture: ComponentFixture<TripBookingVipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripBookingVipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripBookingVipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
