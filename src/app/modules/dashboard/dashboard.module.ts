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

import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from "@progress/kendo-angular-charts";
import { DashboardHomeActiveDriversComponent } from './dashboard-home/dashboard-home-active-drivers/dashboard-home-active-drivers.component';
import { DashboardHomePendingTripsComponent } from './dashboard-home/dashboard-home-pending-trips/dashboard-home-pending-trips.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),

    ChartsModule
  ],
  declarations: [
    DashboardComponent,

    DashboardHomeComponent,

    DashboardHomeTripTilesComponent,
    DashboardHomeTripTileComponent,

    DashboardHomePendingTripsComponent,
    DashboardHomeUpcomingTripsComponent,
    DashboardHomeOngoingTripsComponent,
    DashboardHomeActiveDriversComponent,

    DashboardHomeTripTypeChartComponent,
    DashboardHomeTripMilageChartComponent,

    DashboardHomeTripBottomTilesComponent,
    DashboardHomeTripBottomTileComponent,
  ]
})
export class DashboardModule { }
