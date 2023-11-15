import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardHomeTripTileComponent } from './dashboard-home/dashboard-home-trip-tiles/dashboard-home-trip-tile/dashboard-home-trip-tile.component';
import { DashboardHomeTripTilesComponent } from './dashboard-home/dashboard-home-trip-tiles/dashboard-home-trip-tiles.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardHomeTripTilesComponent,
    DashboardHomeTripTileComponent,
  ]
})
export class DashboardModule { }
