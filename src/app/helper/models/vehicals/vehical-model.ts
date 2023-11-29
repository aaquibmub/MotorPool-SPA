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

  engineOilCapacity: number;
  recommendedOilBrand: string;
  oilNextDueMilage: number;
  oilNextDueDate: string;
  oilComments: string;

  rimSize: string;
  tyreSize: string;
  tireBrand: string;
  tyreExpiryDate: Date;
  tyreComments: string;

  odoMeter: number;
  odoMeterComments: string;

  get getFullName() {
    return this.make + ' ' + this.model + ' ' + this.modelYear.toString();
  }
}
