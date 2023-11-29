import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproversAllComponent } from './approvers-all.component';

describe('ApproversAllComponent', () => {
  let component: ApproversAllComponent;
  let fixture: ComponentFixture<ApproversAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproversAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproversAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
