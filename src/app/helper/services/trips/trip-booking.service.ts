import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { TripBookingScheduledModel } from '../../models/trips/trip-bookings/trip-booking-scheduled-model';
import { HttpClient } from '@angular/common/http';
import { TripBookingPassengerModel } from '../../models/trips/trip-bookings/trip-booking-passenger-model';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { guid } from '@progress/kendo-angular-common';
import { UtilityRix } from '../../common/utility-rix';
import { TripBookingSpecialServiceModel } from '../../models/trips/trip-bookings/trip-booking-special-service-model';
import { TripStopModel } from '../../models/trips/enroute/trip-stop-model';
import { ResponseModel } from '../../models/common/response-model';
import { UtilityService } from '../common/utility.service';
import { TripPickupModel } from '../../models/trips/enroute/trip-pickup-model';
import { TripDropoffModel } from '../../models/trips/enroute/trip-dropoff-model';
import { TripBookingStartNowModel } from '../../models/trips/trip-bookings/trip-booking-start-now-model';

@Injectable({
  providedIn: 'root'
})
export class TripBookingService {
  baseUrl = environment.apiUrl + 'tripbooking/';

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService) {
  }

  getScheduledBooking(id: string): Observable<TripBookingScheduledModel> {
    return this.http.get<TripBookingScheduledModel>(this.baseUrl + 'get-scheduled' + id);
  }

  getDefaultScheduledBookingModel(): Observable<TripBookingScheduledModel> {
    const url = this.baseUrl + 'get-default-scheduled';
    return this.http.get<TripBookingScheduledModel>(url);
  }

  addUpdateScheduled(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'schedule', model);
  }

  prepareSaveTripBookingScheduled(
    id: string,
    formValue: TripBookingScheduledModel
  ): FormData {

    const formData = new FormData();
    if (id) {
      formData.append('id', id);
    }

    this.utilityService.buildFormData(formData, formValue);

    let index = 0;
    formValue.pickups.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'pickups[' + index + ']');
      index++;
    });

    index = 0;
    formValue.stops.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'stops[' + index + ']');
      index++;
    });

    index = 0;
    formValue.dropoffs.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'dropoffs[' + index + ']');
      index++;
    });

    // index = 0;
    // formValue.programPriorities.forEach(f => {
    //   this.utilityService.buildFormData(formData, f, 'programPriorities[' + index + ']');
    //   index++;
    // });
    // index = 0;
    // formValue.specialRequests.forEach(f => {
    //   this.utilityService.buildFormData(formData, f, 'specialRequests[' + index + ']');
    //   index++;
    // });

    return formData;

  }

  getStartNowBooking(id: string): Observable<TripBookingStartNowModel> {
    return this.http.get<TripBookingStartNowModel>(this.baseUrl + 'get-start-now' + id);
  }

  getDefaultStartNowBookingModel(): Observable<TripBookingStartNowModel> {
    const url = this.baseUrl + 'get-default-start-now';
    return this.http.get<TripBookingStartNowModel>(url);
  }

  addUpdateStartNow(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'start-now', model);
  }

  prepareSaveTripBookingStartNow(
    id: string,
    formValue: TripBookingStartNowModel
  ): FormData {

    const formData = new FormData();
    if (id) {
      formData.append('id', id);
    }

    this.utilityService.buildFormData(formData, formValue);

    return formData;

  }



  // Form Groups
  createPassengerFormGroup(model: TripBookingPassengerModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model && model.id ? model.id : guid()),
      passenger: new UntypedFormControl(
        model ? model.passenger : null, [UtilityRix.dropdownRequired as ValidatorFn]),
      gender: new UntypedFormControl(
        model ? model.gender : null, [UtilityRix.dropdownRequired as ValidatorFn]),
      ageGroup: new UntypedFormControl(
        model ? model.ageGroup : null, [UtilityRix.dropdownRequired as ValidatorFn])
    });
  }

  createSpecialServiceFormGroup(model: TripBookingSpecialServiceModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model.id ? model.id : guid()),
      required: new UntypedFormControl(model ? model.required : false),
      specialService: new UntypedFormControl(
        model ? model.specialService : null, [UtilityRix.dropdownRequired as ValidatorFn]),
      qty: new UntypedFormControl(model ? model.qty : 0)
    });
  }

  createPickupFormGroup(model: TripPickupModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model && model.id ? model.id : guid()),
      sequence: new UntypedFormControl(model ? model.sequence : false),
      pickupAddress: new UntypedFormControl(
        model ? model.pickupAddress : null, [UtilityRix.dropdownRequired as ValidatorFn]),

    });
  }

  createStopFormGroup(model: TripStopModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model && model.id ? model.id : guid()),
      sequence: new UntypedFormControl(model ? model.sequence : false),
      stopAddress: new UntypedFormControl(
        model ? model.stopAddress : null, [UtilityRix.dropdownRequired as ValidatorFn]),

    });
  }

  createDropoffFormGroup(model: TripDropoffModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model && model.id ? model.id : guid()),
      sequence: new UntypedFormControl(model ? model.sequence : false),
      dropoffAddress: new UntypedFormControl(
        model ? model.dropoffAddress : null, [UtilityRix.dropdownRequired as ValidatorFn]),

    });
  }

}
