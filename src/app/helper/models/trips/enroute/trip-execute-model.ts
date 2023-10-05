import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripExecuteModel {
  id: string;
  tripId: string;
  bookedBy: string;
  requester: string;
  driver: DropdownItem<string>;
  vehical: DropdownItem<string>;
  notes: string;
}
