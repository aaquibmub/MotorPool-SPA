/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DriversAllComponent } from './drivers-all.component';

describe('DriversAllComponent', () => {
  let component: DriversAllComponent;
  let fixture: ComponentFixture<DriversAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
