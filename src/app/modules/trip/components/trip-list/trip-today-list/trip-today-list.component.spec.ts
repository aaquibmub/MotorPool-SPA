/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripTodayListComponent } from './trip-today-list.component';

describe('TripTodayListComponent', () => {
  let component: TripTodayListComponent;
  let fixture: ComponentFixture<TripTodayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripTodayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripTodayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
