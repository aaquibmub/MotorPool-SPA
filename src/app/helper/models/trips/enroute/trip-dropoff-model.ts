import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripDropoffModel {
  id: string;
  sequence: number;
  dropoffAddress: DropdownItem<string>;
}

