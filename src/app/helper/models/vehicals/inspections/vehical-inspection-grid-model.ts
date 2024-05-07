import { VehicalInspectionStatus } from 'src/app/helper/common/shared-types';

export class VehicalInspectionGridModel {
  id: string;
  vehicleId: string;
  inspectionDate: Date;
  inspectionId: string;
  registrationPlate: string;
  inspectionBy: string;
  status: VehicalInspectionStatus;
}
