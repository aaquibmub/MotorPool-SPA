import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardHomeOngoingTripsComponent } from './dashboard-home/dashboard-home-ongoing-trips/dashboard-home-ongoing-trips.component';
import { DashboardHomeTripBottomTileComponent } from './dashboard-home/dashboard-home-trip-bottom-tiles/dashboard-home-trip-bottom-tile/dashboard-home-trip-bottom-tile.component';
import { DashboardHomeTripBottomTilesComponent } from './dashboard-home/dashboard-home-trip-bottom-tiles/dashboard-home-trip-bottom-tiles.component';
import { DashboardHomeTripMilageChartComponent } from './dashboard-home/dashboard-home-trip-milage-chart/dashboard-home-trip-milage-chart.component';
import { DashboardHomeTripTileComponent } from './dashboard-home/dashboard-home-trip-tiles/dashboard-home-trip-tile/dashboard-home-trip-tile.component';
import { DashboardHomeTripTilesComponent } from './dashboard-home/dashboard-home-trip-tiles/dashboard-home-trip-tiles.component';
import { DashboardHomeTripTypeChartComponent } from './dashboard-home/dashboard-home-trip-type-chart/dashboard-home-trip-type-chart.component';
import { DashboardHomeUpcomingTripsComponent } from './dashboard-home/dashboard-home-upcoming-trips/dashboard-home-upcoming-trips.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,

    DashboardHomeComponent,

    DashboardHomeTripTilesComponent,
    DashboardHomeTripTileComponent,

    DashboardHomeUpcomingTripsComponent,
    DashboardHomeOngoingTripsComponent,

    DashboardHomeTripTypeChartComponent,
    DashboardHomeTripMilageChartComponent,

    DashboardHomeTripBottomTilesComponent,
    DashboardHomeTripBottomTileComponent,
  ]
})
export class DashboardModule { }
