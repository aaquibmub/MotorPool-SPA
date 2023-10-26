/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripOngoingListComponent } from './trip-ongoing-list.component';

describe('TripOngoingListComponent', () => {
  let component: TripOngoingListComponent;
  let fixture: ComponentFixture<TripOngoingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOngoingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOngoingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
