/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PassengerFormsComponent } from './passenger-forms.component';

describe('PassengerFormsComponent', () => {
  let component: PassengerFormsComponent;
  let fixture: ComponentFixture<PassengerFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
