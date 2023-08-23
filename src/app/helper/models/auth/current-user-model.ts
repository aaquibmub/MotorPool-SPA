import { UserRoleType } from '../../common/shared-types';
import { UserPermissionModel } from './user-permission-model';

export class CurrentUserModel {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  login: string;
  email: string;
  roleType: UserRoleType;
  roleId: string;
  locationId: string;
  locationName: string;
  counterId: string;
  image: string;

  storeId: string;
  storeName: string;
  storeLogo: string;
  storeAddress: string;

  permissions: UserPermissionModel[];

  emailVerified: boolean;

  getFullName(): string {
    return this.firstName
      + ((!this.middleName ? ' ' + this.middleName : ''))
      + ((!this.lastName ? ' ' + this.lastName : ''));
  }
}

