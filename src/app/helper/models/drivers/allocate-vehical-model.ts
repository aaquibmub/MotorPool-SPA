import { DropdownItem } from '../common/dropdown/dropdown-item.model';

export class AllocateVehicalModel {
  id: string;
  driverId: string;
  driverName: string;
  status: string;
  vehical: DropdownItem<string>;
  notes: string;
}
