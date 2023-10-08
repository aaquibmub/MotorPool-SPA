import { Gender, TripDestination, TripRoute } from './../../../common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';
import { TripBookingPassengerModel } from './trip-booking-passenger-model';
import { TripBookingSpecialServiceModel } from './trip-booking-special-service-model';
import { TripStopModel } from '../enroute/trip-stop-model';
import { TripPickupModel } from '../enroute/trip-pickup-model';
import { TripDropoffModel } from '../enroute/trip-dropoff-model';
import { TripDestinationModel } from '../enroute/trip-destination-model';

export class TripBookingModel {
  id: string;
  serialNumber: number;
  bookedBy: DropdownItem<string>;
  approvedBy: DropdownItem<string>;

  requester: DropdownItem<string>;
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

  notes: string;

}
