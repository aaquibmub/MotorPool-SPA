import { VehicalStatus } from '../../common/shared-types';
import { DropdownItem } from '../common/dropdown/dropdown-item.model';

export class VehicalModel {
  id: string;
  vehicalId: number;
  vehicalIdStr: string;
  registrationPlate: string;
  status: DropdownItem<VehicalStatus>;
  make: string;
  model: string;
  modelYear: number;
  type: DropdownItem<string>;
  color: string;
  armoured: boolean;

  get getFullName() {
    return this.make + ' ' + this.model + ' ' + this.modelYear.toString();
  }
}
