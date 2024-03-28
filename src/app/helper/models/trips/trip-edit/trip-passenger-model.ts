import { OPM } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripPassengerModel {
  tripId: string;
  passengerName: string;
  opm: DropdownItem<OPM>;
}
