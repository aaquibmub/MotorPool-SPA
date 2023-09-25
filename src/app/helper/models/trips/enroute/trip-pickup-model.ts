import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripPickupModel {
  id: string;
  sequence: number;
  pickupAddress: DropdownItem<string>;
}
