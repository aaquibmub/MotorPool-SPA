import { DropdownItem } from '../common/dropdown/dropdown-item.model';

export class DriverModel {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationality: DropdownItem<string>;
  idNumber: string;
  mobileNumber: string;
  emailAddress: string;
  userId: string;
  password: string;
}
