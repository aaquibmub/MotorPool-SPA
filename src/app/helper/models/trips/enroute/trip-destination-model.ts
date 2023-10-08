import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripDestinationModel {
  id: string;
  sequence: number;
  type: DropdownItem<number>;
  address: DropdownItem<string>;
}

