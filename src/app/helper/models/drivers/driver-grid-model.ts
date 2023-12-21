import { DriverStatus } from '../../common/shared-types';

export class DriverGridModel {
  id: string;
  userId: number;
  userIdStr: string;
  fullName: string;
  nationalId: string;
  mobileNumber: string;
  createdDate: Date;
  active: boolean;
  driverStatus: DriverStatus;
  vehicalAllocated: string;
}
