/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CultureAndTimezoneComponent } from './culture-and-timezone.component';

describe('CultureAndTimezoneComponent', () => {
  let component: CultureAndTimezoneComponent;
  let fixture: ComponentFixture<CultureAndTimezoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultureAndTimezoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureAndTimezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
