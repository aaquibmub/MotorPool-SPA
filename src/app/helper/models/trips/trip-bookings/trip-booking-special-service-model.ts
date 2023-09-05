import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripBookingSpecialServiceModel {
  id: string;
  required: boolean;
  specialService: DropdownItem<string>;
  qty: number;
}
