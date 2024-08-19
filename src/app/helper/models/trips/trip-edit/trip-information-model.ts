import { TripDestination } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripInformationModel {
  tripId: string;

  tripDestination: DropdownItem<TripDestination>;

  pickupDate: Date;
  pickupTime: Date;

  vehicle: DropdownItem<string>;

  notes: string;
}
