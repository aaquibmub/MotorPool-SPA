import { TripDestination, TripType } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripInformationModel {
  tripId: string;
  type: TripType;
  updateSeries: boolean;
  tripDestination: DropdownItem<TripDestination>;

  pickupDate: Date;
  pickupTime: Date;

  vehicle: DropdownItem<string>;

  notes: string;
}
