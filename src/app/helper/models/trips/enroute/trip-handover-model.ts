import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripHandoverModel {
  id: string;
  tripId: string;
  bookedBy: string;
  requester: string;
  currentDriver: DropdownItem<string>;
  currentVehical: DropdownItem<string>;
  newDriver: DropdownItem<string>;
  newVehical: DropdownItem<string>;

}
