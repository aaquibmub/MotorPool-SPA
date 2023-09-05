import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class TripStopModel {
  id: string;
  sequence: number;
  stopAddress: DropdownItem<string>;
}
