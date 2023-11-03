/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripViewVehicalComponent } from './trip-view-vehical.component';

describe('TripViewVehicalComponent', () => {
  let component: TripViewVehicalComponent;
  let fixture: ComponentFixture<TripViewVehicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripViewVehicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripViewVehicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
