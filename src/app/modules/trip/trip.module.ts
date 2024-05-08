import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { TripBookingRefuellingEditComponent } from './components/trip-booking/trip-booking-refuelling-edit/trip-booking-refuelling-edit.component';
import { TripBookingScheduledEditComponent } from './components/trip-booking/trip-booking-scheduled-edit/trip-booking-scheduled-edit.component';
import { TripBookingStartNowEditComponent } from './components/trip-booking/trip-booking-start-now-edit/trip-booking-start-now-edit.component';
import { TripBookingComponent } from './components/trip-booking/trip-booking.component';
import { TripBookingAllComponent } from './components/trip-bookings/trip-booking-all/trip-booking-all.component';
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
import { TripRoutingModule } from './trip-routing.module';
import { TripComponent } from './trip.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PerfectScrollbarModule,
    FormsModule,
    DropDownsModule,
    DateInputsModule,
    InputsModule,
    GridModule,
    ButtonsModule,
    TripRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    TripComponent,

    TripBookingComponent,

    TripBookingsComponent,
    TripBookingAllComponent,

    TripBookingStartNowListComponent,
    TripBookingStartNowEditComponent,

    TripBookingScheduledEditComponent,
    TripBookingScheduledListComponent,

    TripBookingRefuellingListComponent,
    TripBookingRefuellingEditComponent,

    TripViewComponent,
    TripViewDetailComponent,
    TripViewLogComponent,
    TripViewVehicalComponent,
    TripViewDriverComponent,

    TripEditComponent,
    TripEditInfoComponent,
    TripEditJourneyComponent,
    TripEditPassengerListComponent,
    TripEditDestinationListComponent,

    TripListComponent,
    TripTodayListComponent,
    TripOngoingListComponent,

  ]
})
export class TripModule { }
