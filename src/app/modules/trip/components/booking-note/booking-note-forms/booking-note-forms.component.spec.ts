/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookingNoteFormsComponent } from './booking-note-forms.component';

describe('BookingNoteFormsComponent', () => {
  let component: BookingNoteFormsComponent;
  let fixture: ComponentFixture<BookingNoteFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingNoteFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNoteFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
