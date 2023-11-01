/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PassengerEditComponent } from './passenger-edit.component';

describe('PassengerEditComponent', () => {
  let component: PassengerEditComponent;
  let fixture: ComponentFixture<PassengerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
