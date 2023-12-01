import { DropdownItem } from '../../common/dropdown/dropdown-item.model';

export class VehicalInspectionBodySideItemModel {
  side: DropdownItem<string>;
  parts: VehicalInspectionBodyPartItemModel[];

}

export class VehicalInspectionBodyPartItemModel {
  id: string;
  part: DropdownItem<string>;

  scraches: number;
  dents: number;
  damages: number;
}
