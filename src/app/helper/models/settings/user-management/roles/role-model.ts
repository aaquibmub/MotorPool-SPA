import { UserRoleType } from './../../../../common/shared-types';
import { DropdownItem } from '../../../common/dropdown/dropdown-item.model';
import { PermissionModel } from './permission-model';

export class RoleModel {

  roleID: string;

  type: DropdownItem<UserRoleType>;

  name: string;

  permissions: PermissionModel[];
}
