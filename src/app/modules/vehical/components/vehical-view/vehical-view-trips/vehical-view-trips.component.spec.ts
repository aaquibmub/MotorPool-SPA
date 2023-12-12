import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalViewTripsComponent } from './vehical-view-trips.component';

describe('VehicalViewTripsComponent', () => {
  let component: VehicalViewTripsComponent;
  let fixture: ComponentFixture<VehicalViewTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalViewTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalViewTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
