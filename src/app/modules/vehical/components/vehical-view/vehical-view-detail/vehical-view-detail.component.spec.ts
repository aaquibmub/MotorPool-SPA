import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalViewDetailComponent } from './vehical-view-detail.component';

describe('VehicalViewDetailComponent', () => {
  let component: VehicalViewDetailComponent;
  let fixture: ComponentFixture<VehicalViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalViewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
