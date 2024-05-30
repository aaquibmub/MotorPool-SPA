import { PassengerModel } from '../passengers/passenger-model';
import { DropdownItem } from './dropdown/dropdown-item.model';

export class PopupConfigModel {
  show: boolean;
  arg?: any;
  item?: DropdownItem<string>;
  passenger?: PassengerModel;
}
