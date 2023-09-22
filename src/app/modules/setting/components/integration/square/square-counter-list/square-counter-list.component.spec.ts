/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SquareCounterListComponent } from './square-counter-list.component';

describe('SquareCounterListComponent', () => {
  let component: SquareCounterListComponent;
  let fixture: ComponentFixture<SquareCounterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareCounterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareCounterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
