import { DocumentationService } from './../../../../../helper/services/config/documentation.service';
import { UtilityService } from 'src/app/helper/services/utility.service';
import { AutoCodeConfigModel } from './../../../../../helper/models/config/documentation/auto-code-config-model';
import { AutoCodeConfig } from './../../../../../helper/models/config/documentation/auto-code-config';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { AlertService } from 'src/app/helper/services/alert.service';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { UtilityRix } from 'src/app/helper/common/utility_rix';

@Component({
  selector: 'app-document-auto-code-config',
  templateUrl: './document-auto-code-config.component.html',
  styleUrls: ['./document-auto-code-config.component.css']
})
export class DocumentAutoCodeConfigComponent implements OnInit {

  form: UntypedFormGroup;
  model: AutoCodeConfigModel;

  list: AutoCodeConfig[];

  constructor(
    private el: ElementRef,
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private alertService: AlertService,
    private documentationService: DocumentationService
  ) { }

  ngOnInit(): void {

    this.documentationService.getAutoCodeConfigModel()
      .subscribe(
        (model: AutoCodeConfigModel) => {
          this.list = model.autoCodes;
          this.initForm();
        }
      );
  }

  private initForm(): void {
    const autoCodes = [];

    if (this.list) {
      this.list.forEach(f => {
        autoCodes.push(this.utilityService.createAutoCodeConfigFormGroup(f));
      });
    }

    this.form = new UntypedFormGroup({

      autoCodes: new UntypedFormArray(autoCodes)

    });

  }

  getAutoCodeSample(t: AbstractControl): string {
    return t.get('prefix').value +
      t.get('separator').value +
      this.utilityService.getZerosByDigits(t.get('numberOfDigits').value, '1');
  }

  // addNewAutoCode(): void {
  //   (this.form.get('autoCodes') as FormArray).push(this.utilityService.createAutoCodeConfigFormGroup({
  //     iD: guid(),
  //     name: '',
  //     taxRate: 0
  //   }));
  // }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    this.model = this.form.value;

    this.documentationService.updateAutoCodeConfig(this.model)
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Auto codes updated successfully'));
          this.ngOnInit();
        }
      );
  }

}
