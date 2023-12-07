import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverViewInspectionComponent } from './driver-view-inspection.component';

describe('DriverViewInspectionComponent', () => {
  let component: DriverViewInspectionComponent;
  let fixture: ComponentFixture<DriverViewInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverViewInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverViewInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
