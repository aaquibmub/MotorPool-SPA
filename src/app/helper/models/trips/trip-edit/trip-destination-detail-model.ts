import { TripRoute } from 'src/app/helper/common/shared-types';
import { DropdownItem } from '../../common/dropdown/dropdown-item.model';
import { TripDestinationModel } from '../enroute/trip-destination-model';

export class TripDestinationDetailModel {
  tripId: string;
  tripRoute: DropdownItem<TripRoute>;
  startingPoint: DropdownItem<string>;
  destinations: TripDestinationModel[];
}
