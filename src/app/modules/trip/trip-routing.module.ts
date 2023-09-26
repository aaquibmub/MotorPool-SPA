import { NgModule } from '@angular/core';
import { TripComponent } from './trip.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TripBookingComponent } from './components/trip-booking/trip-booking.component';
import { TripBookingScheduledEditComponent } from './components/trip-booking/trip-booking-scheduled-edit/trip-booking-scheduled-edit.component';
import { TripBookingsComponent } from './components/trip-bookings/trip-bookings.component';
import { TripBookingAllComponent } from './components/trip-bookings/trip-booking-all/trip-booking-all.component';
import { TripBookingScheduledListComponent } from './components/trip-bookings/trip-booking-scheduled-list/trip-booking-scheduled-list.component';
import { TripBookingStartNowListComponent } from './components/trip-bookings/trip-booking-start-now-list/trip-booking-start-now-list.component';
import { TripBookingStartNowEditComponent } from './components/trip-booking/trip-booking-start-now-edit/trip-booking-start-now-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TripComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        redirectTo: '/trips/bookings/all',
        pathMatch: 'full'
      },

      // trip booking
      {
        path: 'booking',
        component: TripBookingComponent,
        children: [
          {
            path: '',
            redirectTo: '/trips/bookings/all',
            pathMatch: 'full'
          },
          { path: 'new-scheduled', component: TripBookingScheduledEditComponent },
          { path: 'new-start-now', component: TripBookingStartNowEditComponent },
        ]
      },
      {
        path: 'bookings',
        component: TripBookingsComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: TripBookingAllComponent },
          { path: 'scheduled', component: TripBookingScheduledListComponent },
          { path: 'start-now', component: TripBookingStartNowListComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {
}
