import { Gender, OPM, TripDestination, TripRoute } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';
import { TripDestinationModel } from '../enroute/trip-destination-model';
import { TripBookingPassengerModel } from '../trip-bookings/trip-booking-passenger-model';
import { TripBookingSpecialServiceModel } from '../trip-bookings/trip-booking-special-service-model';

export class TripViewDetailModel {

  odoMeterStart?: number;
  odoMeterEnd?: number;
  odoMeterDifference?: number;

  bookedBy: DropdownItem<string>;
  approvedBy: DropdownItem<string>;
  executedBy: DropdownItem<string>;

  requester: DropdownItem<string>;
  requesterPhone: string;
  requesterOpm: DropdownItem<OPM>;
  requesterGender: DropdownItem<Gender>;
  requesterAddress: DropdownItem<string>;
  isRequesterTraveling: boolean;
  passengers: TripBookingPassengerModel[];

  isSpecialServicesRequired: boolean;
  specialSevices: TripBookingSpecialServiceModel[];

  tripRoute: DropdownItem<TripRoute>;
  tripDestination: DropdownItem<TripDestination>;

  startingPoint: DropdownItem<string>;
  destinations: TripDestinationModel[];

  driver: DropdownItem<string>;
  vehical: DropdownItem<string>;
  registrationPlate: string;

  notes: string;

}

