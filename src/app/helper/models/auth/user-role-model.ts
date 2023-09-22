import { UserRoleType } from '../../common/shared-types';
import { DropdownItem } from '../common/dropdown/dropdown-item.model';

export class UserRoleModel {
  user: DropdownItem<string>;
  role: DropdownItem<UserRoleType>;
}
