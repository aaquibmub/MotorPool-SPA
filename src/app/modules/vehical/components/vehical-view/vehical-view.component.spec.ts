import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicalViewComponent } from './vehical-view.component';

describe('VehicalViewComponent', () => {
  let component: VehicalViewComponent;
  let fixture: ComponentFixture<VehicalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
