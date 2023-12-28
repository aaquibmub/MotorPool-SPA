import { ImportErrorDetailModel } from './import-error-detail-model';

export class ImportResponseModel {
  errors: ImportErrorDetailModel[];
  hasError: boolean;
  message: string;
}
