import { Gender } from './../../../common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripBookingPassengerModel {
  id: string;
  passenger: DropdownItem<string>;
  gender: DropdownItem<Gender>;
  ageGroup: DropdownItem<string>;
}
