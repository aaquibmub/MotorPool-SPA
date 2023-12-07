import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverViewDetailComponent } from './driver-view-detail.component';

describe('DriverViewDetailComponent', () => {
  let component: DriverViewDetailComponent;
  let fixture: ComponentFixture<DriverViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverViewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
