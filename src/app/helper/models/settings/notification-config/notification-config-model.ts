import { UserRoleType } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';
import { NotificationFeatureModel } from './notification-feature-model';

export class NotificationConfigModel {
  name: string;
  onSystem: boolean;
  onEmail: boolean;
  features: NotificationFeatureModel[];
  users: NotificationConfigUserModel[];
}

export class NotificationConfigUserModel {
  id: string;
  user: DropdownItem<string>;
  role: DropdownItem<UserRoleType>;
}
