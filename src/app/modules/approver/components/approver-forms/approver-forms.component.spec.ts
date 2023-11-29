import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverFormsComponent } from './approver-forms.component';

describe('ApproverFormsComponent', () => {
  let component: ApproverFormsComponent;
  let fixture: ComponentFixture<ApproverFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
