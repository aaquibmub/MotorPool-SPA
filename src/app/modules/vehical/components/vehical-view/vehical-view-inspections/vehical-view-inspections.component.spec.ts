import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalViewInspectionsComponent } from './vehical-view-inspections.component';

describe('VehicalViewInspectionsComponent', () => {
  let component: VehicalViewInspectionsComponent;
  let fixture: ComponentFixture<VehicalViewInspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalViewInspectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalViewInspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
