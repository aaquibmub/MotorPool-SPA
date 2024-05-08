import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TripBookingInternalEditComponent } from './components/trip-booking/trip-booking-internal-edit/trip-booking-internal-edit.component';
import { TripBookingRefuellingEditComponent } from './components/trip-booking/trip-booking-refuelling-edit/trip-booking-refuelling-edit.component';
import { TripBookingScheduledEditComponent } from './components/trip-booking/trip-booking-scheduled-edit/trip-booking-scheduled-edit.component';
import { TripBookingStartNowEditComponent } from './components/trip-booking/trip-booking-start-now-edit/trip-booking-start-now-edit.component';
import { TripBookingComponent } from './components/trip-booking/trip-booking.component';
import { TripBookingAllComponent } from './components/trip-bookings/trip-booking-all/trip-booking-all.component';
import { TripBookingInternalListComponent } from './components/trip-bookings/trip-booking-internal-list/trip-booking-internal-list.component';
import { TripBookingRefuellingListComponent } from './components/trip-bookings/trip-booking-refuelling-list/trip-booking-refuelling-list.component';
import { TripBookingScheduledListComponent } from './components/trip-bookings/trip-booking-scheduled-list/trip-booking-scheduled-list.component';
import { TripBookingStartNowListComponent } from './components/trip-bookings/trip-booking-start-now-list/trip-booking-start-now-list.component';
import { TripBookingsComponent } from './components/trip-bookings/trip-bookings.component';
import { TripEditDestinationListComponent } from './components/trip-edit/trip-edit-destination-list/trip-edit-destination-list.component';
import { TripEditInfoComponent } from './components/trip-edit/trip-edit-info/trip-edit-info.component';
import { TripEditJourneyComponent } from './components/trip-edit/trip-edit-journey/trip-edit-journey.component';
import { TripEditPassengerListComponent } from './components/trip-edit/trip-edit-passenger-list/trip-edit-passenger-list.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripOngoingListComponent } from './components/trip-list/trip-ongoing-list/trip-ongoing-list.component';
import { TripTodayListComponent } from './components/trip-list/trip-today-list/trip-today-list.component';
import { TripViewDetailComponent } from './components/trip-view/trip-view-detail/trip-view-detail.component';
import { TripViewDriverComponent } from './components/trip-view/trip-view-driver/trip-view-driver.component';
import { TripViewLogComponent } from './components/trip-view/trip-view-log/trip-view-log.component';
import { TripViewVehicalComponent } from './components/trip-view/trip-view-vehical/trip-view-vehical.component';
import { TripViewComponent } from './components/trip-view/trip-view.component';
import { TripComponent } from './trip.component';

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

      // new trip booking
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
          { path: 'new-internal', component: TripBookingInternalEditComponent },
          { path: 'new-refuelling', component: TripBookingRefuellingEditComponent },
        ]
      },
      // trip booking lists
      {
        path: 'bookings',
        component: TripBookingsComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: TripBookingAllComponent },
          { path: 'start-now', component: TripBookingStartNowListComponent },
          { path: 'internal', component: TripBookingInternalListComponent },
          { path: 'scheduled', component: TripBookingScheduledListComponent },
          { path: 'refuelling', component: TripBookingRefuellingListComponent }
        ]
      },
      // trip view
      {
        path: 'view/:id',
        component: TripViewComponent,
        children: [
          {
            path: '',
            redirectTo: '/trips/view/:id/detail',
            pathMatch: 'full'
          },
          { path: 'detail', component: TripViewDetailComponent },
          { path: 'log', component: TripViewLogComponent },
          { path: 'vehicle', component: TripViewVehicalComponent },
          { path: 'driver', component: TripViewDriverComponent },
        ]
      },
      // trip edit
      {
        path: 'edit/:id',
        component: TripEditComponent,
        children: [
          {
            path: '',
            redirectTo: '/trips/edit/:id/journey',
            pathMatch: 'full'
          },
          { path: 'information', component: TripEditInfoComponent },
          { path: 'journey', component: TripEditJourneyComponent },
          { path: 'passengers', component: TripEditPassengerListComponent },
          { path: 'destinations', component: TripEditDestinationListComponent },
        ]
      },
      // trip list
      {
        path: 'list',
        component: TripListComponent,
        children: [
          { path: '', redirectTo: 'today', pathMatch: 'full' },
          { path: 'today', component: TripTodayListComponent },
          { path: 'on-going', component: TripOngoingListComponent },
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
