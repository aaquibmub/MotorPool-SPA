import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripStatusDetailModel {
  tripId: string;
  tripIdStr: string;
  bookedBy: string;
  requester: string;
  status: DropdownItem<number>;
}
