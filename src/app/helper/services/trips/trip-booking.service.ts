import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { guid } from '@progress/kendo-angular-common';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable, Subject } from 'rxjs';
import { UtilityRix } from '../../common/utility-rix';
import { DropdownItem } from '../../models/common/dropdown/dropdown-item.model';
import { GridList } from '../../models/common/grid/grid-list';
import { ResponseModel } from '../../models/common/response-model';
import { TripDestinationModel } from '../../models/trips/enroute/trip-destination-model';
import { TripDropoffModel } from '../../models/trips/enroute/trip-dropoff-model';
import { TripPickupModel } from '../../models/trips/enroute/trip-pickup-model';
import { TripStopModel } from '../../models/trips/enroute/trip-stop-model';
import { TripBookingNoteGridModel } from '../../models/trips/trip-bookings/booking-note/trip-booking-note-grid-model';
import { TripBookingNoteModel } from '../../models/trips/trip-bookings/booking-note/trip-booking-note-model';
import { TripBookingInternalModel } from '../../models/trips/trip-bookings/trip-booking-internal-model';
import { TripBookingPassengerModel } from '../../models/trips/trip-bookings/trip-booking-passenger-model';
import { TripBookingRefuelingModel } from '../../models/trips/trip-bookings/trip-booking-refueling-model';
import { TripBookingScheduledModel } from '../../models/trips/trip-bookings/trip-booking-scheduled-model';
import { TripBookingSpecialServiceModel } from '../../models/trips/trip-bookings/trip-booking-special-service-model';
import { TripBookingStartNowModel } from '../../models/trips/trip-bookings/trip-booking-start-now-model';
import { TripBookingVipModel } from '../../models/trips/trip-bookings/trip-booking-vip-model';
import { UtilityService } from '../common/utility.service';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripBookingService {
  baseUrl = environment.apiUrl + 'tripbooking/';

  private gridDataBookingNote = new Subject<GridList<TripBookingNoteGridModel>>();

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
    formValue.destinations.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'destinations[' + index + ']');
      index++;
    });

    index = 0;
    formValue.passengers.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'passengers[' + index + ']');
      index++;
    });

    index = 0;
    formValue.specialSevices.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'specialSevices[' + index + ']');
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

    let index = 0;
    formValue.destinations.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'destinations[' + index + ']');
      index++;
    });

    index = 0;
    formValue.passengers.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'passengers[' + index + ']');
      index++;
    });

    index = 0;
    formValue.specialSevices.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'specialSevices[' + index + ']');
      index++;
    });

    return formData;

  }

  getInternalBooking(id: string): Observable<TripBookingInternalModel> {
    return this.http.get<TripBookingInternalModel>(this.baseUrl + 'get-internal' + id);
  }

  getDefaultInternalBookingModel(): Observable<TripBookingInternalModel> {
    const url = this.baseUrl + 'get-default-internal';
    return this.http.get<TripBookingInternalModel>(url);
  }

  addUpdateInternal(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'internal', model);
  }

  prepareSaveTripBookingInternal(
    id: string,
    formValue: TripBookingInternalModel
  ): FormData {

    const formData = new FormData();
    if (id) {
      formData.append('id', id);
    }

    this.utilityService.buildFormData(formData, formValue);

    let index = 0;
    formValue.destinations.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'destinations[' + index + ']');
      index++;
    });

    return formData;

  }

  getRefuelingBooking(id: string): Observable<TripBookingRefuelingModel> {
    return this.http.get<TripBookingRefuelingModel>(this.baseUrl + 'get-refeuling' + id);
  }

  getDefaultRefuelingBookingModel(): Observable<TripBookingRefuelingModel> {
    const url = this.baseUrl + 'get-default-refueling';
    return this.http.get<TripBookingRefuelingModel>(url);
  }

  addUpdateRefueling(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'refueling', model);
  }

  prepareSaveTripBookingRefueling(
    id: string,
    formValue: TripBookingRefuelingModel
  ): FormData {

    const formData = new FormData();
    if (id) {
      formData.append('id', id);
    }

    this.utilityService.buildFormData(formData, formValue);

    let index = 0;
    formValue.destinations.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'destinations[' + index + ']');
      index++;
    });

    return formData;

  }


  getVipBooking(id: string): Observable<TripBookingVipModel> {
    return this.http.get<TripBookingStartNowModel>(this.baseUrl + 'get-vip' + id);
  }

  getDefaultVipBookingModel(): Observable<TripBookingVipModel> {
    const url = this.baseUrl + 'get-default-vip';
    return this.http.get<TripBookingVipModel>(url);
  }

  addUpdateVip(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl + 'vip', model);
  }

  prepareSaveTripBookingVip(
    id: string,
    formValue: TripBookingVipModel
  ): FormData {

    const formData = new FormData();
    if (id) {
      formData.append('id', id);
    }

    this.utilityService.buildFormData(formData, formValue);

    let index = 0;
    formValue.destinations.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'destinations[' + index + ']');
      index++;
    });

    index = 0;
    formValue.passengers.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'passengers[' + index + ']');
      index++;
    });

    index = 0;
    formValue.specialSevices.forEach(f => {
      this.utilityService.buildFormData(formData, f, 'specialSevices[' + index + ']');
      index++;
    });

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

  createDestinationFormGroup(model: TripDestinationModel): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(model && model.id ? model.id : guid()),
      sequence: new UntypedFormControl(model ? model.sequence : 0),
      type: new UntypedFormControl(
        model ? model.type : null, [UtilityRix.dropdownRequired as ValidatorFn]),
      address: new UntypedFormControl(
        model ? model.address : null, [UtilityRix.dropdownRequired as ValidatorFn]),

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

  getDropdownBookingNoteList(text: string): Observable<DropdownItem<string>[]> {
    return this.http.get<DropdownItem<string>[]>(
      this.baseUrl + 'get-dropdown-booking-note-list?text=' + text);
  }

  getBookingNote(id: string): Observable<TripBookingNoteModel> {
    return this.http.get<TripBookingNoteModel>(this.baseUrl + 'get-booking-note/' + id);
  }

  addUpdateBookingNote(model: any): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.baseUrl, model);
  }

  getGridDataBookingNote(): Observable<GridDataResult> {
    return this.gridDataBookingNote.asObservable();
  }
  fetchGridDataBookingNote(
    state: any,
    query: string): void {
    this.http.post<GridList<TripBookingNoteGridModel>>(
      this.baseUrl + 'get-booking-note-gridlist', {
      gridFilters: state,
      search: query
    }).subscribe(
      (gridData: GridList<TripBookingNoteGridModel>) => {
        this.gridDataBookingNote.next(gridData);
      }
    );
  }
}

