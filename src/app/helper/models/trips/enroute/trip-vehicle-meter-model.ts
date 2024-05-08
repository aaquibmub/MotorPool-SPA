import { TripStatus } from 'src/app/helper/common/shared-types';

export class TripVehicleMeterModel {
  tripId: string;
  meterReading: number;
  status: TripStatus;
  time?: Date;
}
