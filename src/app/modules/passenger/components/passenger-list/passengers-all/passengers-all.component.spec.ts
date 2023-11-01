/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PassengersAllComponent } from './passengers-all.component';

describe('PassengersAllComponent', () => {
  let component: PassengersAllComponent;
  let fixture: ComponentFixture<PassengersAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
