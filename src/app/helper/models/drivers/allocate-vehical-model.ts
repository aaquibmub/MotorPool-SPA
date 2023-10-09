import { DropdownItem } from '../common/dropdown/dropdown-item.model';
import { VehicalModel } from '../vehicals/vehical-model';

export class AllocateVehicalModel {
  id: string;
  driverId: string;
  driverName: string;
  status: string;
  vehical: VehicalModel;
  notes: string;
}
