import { TripStatus } from 'src/app/helper/common/shared-types';

export class TripGridModel {
  id: string;
  status: TripStatus;
  onGoing: boolean;
  cancelled: boolean;
}
