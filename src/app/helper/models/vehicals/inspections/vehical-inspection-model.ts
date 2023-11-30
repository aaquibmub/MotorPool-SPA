import { VehicalInspectionBodySideItemModel } from './vehical-inspection-body-side-item-model';
import { VehicalInspectionGeneralItemModel } from './vehical-inspection-general-item-model';

export class VehicalInspectionModel {
  id: string;
  inspectionId: string;
  inspectionIdStr: string;
  dateTime: string;
  vehicalId: string;
  make: string;
  model: string;
  modelYear: string;
  registrationPlate: string;
  generalInspectionItems: VehicalInspectionGeneralItemModel[];
  bodyInspectionItems: VehicalInspectionBodySideItemModel[];
  bodyInspectionComments: string;

  fuelLevel: number;
  odoMeter: number;

}
