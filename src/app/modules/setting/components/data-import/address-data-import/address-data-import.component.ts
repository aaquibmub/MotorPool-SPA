import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { DataImportEntity } from 'src/app/helper/common/shared-types';
import { ImportResponseModel } from 'src/app/helper/models/settings/data-import/import-response-model';
import { ImportService } from 'src/app/helper/services/utilities/import.service';
import { UtilityRix } from './../../../../../helper/common/utility-rix';
import { AlertService } from './../../../../../helper/services/common/alert.service';

@Component({
  selector: 'app-address-data-import',
  templateUrl: './address-data-import.component.html',
  styleUrls: ['./address-data-import.component.css']
})
export class AddressDataImportComponent implements OnInit {
  public entity = DataImportEntity;
  state: State = UtilityRix.gridConfig.state;
  form: FormGroup;
  file: File;

  constructor(
    private importService: ImportService,
    private notificationService: NotificationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      fileName: new FormControl('', [Validators.required]),
    });
  }

  downloadTemplate(): void {
    this.importService.downloadAddressTemplate()
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.downloadFile(event);
          }
        }
      );
  }

  private downloadFile = (data: HttpResponse<Blob>) => {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = 'Address.xlsx';
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  handleFileInput(event: any): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    this.file = files.item(0);
    this.form.patchValue({
      fileName: this.file.name
    });
    this.submit();
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();

    formData.append('file', this.file);

    this.importService.importAddress(formData)
      .subscribe((response: ImportResponseModel) => {
        this.importService.fetchGridData(this.state, this.entity.Address);
        if (response.hasError) {
          this.alertService.setErrorAlert(response.message);
          return;
        }
        this.notificationService.show(
          UtilityRix.getSuccsessNotification(
            'Imported successfully')
        );
      });
  }

}
