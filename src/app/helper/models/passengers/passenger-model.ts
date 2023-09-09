import { Gender, OPM } from '../../common/shared-types';
import { DropdownItem } from '../common/dropdown/dropdown-item.model';

export class PassengerModel {
  id: string;
  name: string;
  gender: DropdownItem<Gender>;
  ageGroup: DropdownItem<string>;
  opm: DropdownItem<OPM>;
  phoneNumber: string;
  address: DropdownItem<string>;
}
