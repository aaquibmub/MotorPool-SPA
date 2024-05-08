import { TripType } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';
import { DestinationType, TripStatus } from './../../../common/shared-types';
export class TripJourneyModel {
  tripId: string;
  tripType: TripType;
  tripStatus: TripStatus;
  driver: string;
  vehicle: string;
  odoStartDateTime?: Date;
  odoMeterAtStart?: number;
  odoEndDateTime?: Date;
  odoMeterAtEnd?: number;
  items: TripJourneyItemModel[];
}

export class TripJourneyItemModel {
  startTime?: Date;
  start: string;
  endTime?: Date;
  dateTime?: Date;
  end: string;
  title: string;
  destinationId?: string;
  location: DropdownItem<string>;
  sequence: number;
  destinationType: DropdownItem<DestinationType>;
  completed: boolean;
}
