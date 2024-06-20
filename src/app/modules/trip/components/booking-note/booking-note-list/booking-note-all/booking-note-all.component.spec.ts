/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookingNoteAllComponent } from './booking-note-all.component';

describe('BookingNoteAllComponent', () => {
  let component: BookingNoteAllComponent;
  let fixture: ComponentFixture<BookingNoteAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingNoteAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNoteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
