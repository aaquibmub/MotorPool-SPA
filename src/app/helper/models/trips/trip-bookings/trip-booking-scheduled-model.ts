import { ScheduledDaysConfig } from '../../common/scheduled-days-config';
import { TripBookingModel } from './trip-booking-model';

export class TripBookingScheduledModel extends TripBookingModel {
  pickupTime: Date;
  startDate: Date;
  endDate: Date;
  scheduledDays: ScheduledDaysConfig;
}
