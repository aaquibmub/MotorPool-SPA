/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookingNoteEditComponent } from './booking-note-edit.component';

describe('BookingNoteEditComponent', () => {
  let component: BookingNoteEditComponent;
  let fixture: ComponentFixture<BookingNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingNoteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
