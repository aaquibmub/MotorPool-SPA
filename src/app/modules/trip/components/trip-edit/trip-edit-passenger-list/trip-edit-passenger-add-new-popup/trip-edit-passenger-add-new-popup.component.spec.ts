/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripEditPassengerAddNewPopupComponent } from './trip-edit-passenger-add-new-popup.component';

describe('TripEditPassengerAddNewPopupComponent', () => {
  let component: TripEditPassengerAddNewPopupComponent;
  let fixture: ComponentFixture<TripEditPassengerAddNewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripEditPassengerAddNewPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripEditPassengerAddNewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
