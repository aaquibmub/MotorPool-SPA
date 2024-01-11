import { DropdownItem } from './dropdown/dropdown-item.model';

export class PopupConfigModel {
  show: boolean;
  arg?: any;
  item?: DropdownItem<any>
}
