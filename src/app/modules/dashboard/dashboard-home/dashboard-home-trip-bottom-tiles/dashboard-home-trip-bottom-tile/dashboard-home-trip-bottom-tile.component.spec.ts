/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardHomeTripBottomTileComponent } from './dashboard-home-trip-bottom-tile.component';

describe('DashboardHomeTripBottomTileComponent', () => {
  let component: DashboardHomeTripBottomTileComponent;
  let fixture: ComponentFixture<DashboardHomeTripBottomTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHomeTripBottomTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHomeTripBottomTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
