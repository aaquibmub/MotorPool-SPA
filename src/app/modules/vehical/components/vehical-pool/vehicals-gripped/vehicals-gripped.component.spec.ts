/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VehicalsGrippedComponent } from './vehicals-gripped.component';

describe('VehicalsGrippedComponent', () => {
  let component: VehicalsGrippedComponent;
  let fixture: ComponentFixture<VehicalsGrippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicalsGrippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicalsGrippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
