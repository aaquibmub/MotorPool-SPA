import { DropdownItem } from '../../../common/dropdown/dropdown-item.model';
import { UserRoleType } from './../../../../common/shared-types';
export class UserModel {

  userID: string;

  firstName: string;

  lastName: string;
  nationality: DropdownItem<string>;

  email: string;
  mobile: string;

  login: string;

  role: DropdownItem<string>;

  active: boolean;

}
