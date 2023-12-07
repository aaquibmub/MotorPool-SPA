import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverViewTripsComponent } from './driver-view-trips.component';

describe('DriverViewTripsComponent', () => {
  let component: DriverViewTripsComponent;
  let fixture: ComponentFixture<DriverViewTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverViewTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverViewTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
