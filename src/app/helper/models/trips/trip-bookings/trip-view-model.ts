import { DropdownItem } from '../../common/dropdown/dropdown-item.model';
import { TripDestinationModel } from '../enroute/trip-destination-model';
import { Gender, TripDestination, TripRoute } from './../../../common/shared-types';
import { TripBookingPassengerModel } from './trip-booking-passenger-model';
import { TripBookingSpecialServiceModel } from './trip-booking-special-service-model';

export class TripViewModel {
  id: string;
  serialNumber: number;
  bookedBy: DropdownItem<string>;
  approvedBy: DropdownItem<string>;

  requester: DropdownItem<string>;
  requesterGender: DropdownItem<Gender>;
  requesterAddress: DropdownItem<string>;
  isRequesterTraveling: boolean;
  passengers: TripBookingPassengerModel[];
  phoneNumber: string;

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
