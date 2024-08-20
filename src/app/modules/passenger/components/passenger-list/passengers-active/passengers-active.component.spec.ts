/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PassengersActiveComponent } from './passengers-active.component';

describe('PassengersActiveComponent', () => {
  let component: PassengersActiveComponent;
  let fixture: ComponentFixture<PassengersActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
