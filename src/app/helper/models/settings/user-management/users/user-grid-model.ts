import { UserRoleType } from './../../../../common/shared-types';
export class UserGridModel {

  userID: string;

  firstName: string;

  lastName: string;

  email: string;
  mobile: string;

  login: string;
  createdDate: Date;

  roleType: UserRoleType;

  active: boolean;

}
