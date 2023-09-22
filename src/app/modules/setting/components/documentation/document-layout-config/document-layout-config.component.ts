import { DocumentTemplateType } from './../../../../../helper/common/shared_types';
import { UtilityRix } from 'src/app/helper/common/utility_rix';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { DocumentationService } from './../../../../../helper/services/config/documentation.service';
import { AlertService } from 'src/app/helper/services/alert.service';
import { UtilityService } from 'src/app/helper/services/utility.service';
import { DocumentTemplateConfigModel } from './../../../../../helper/models/config/documentation/document-template-config-model';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-document-layout-config',
  templateUrl: './document-layout-config.component.html',
  styleUrls: ['./document-layout-config.component.css']
})
export class DocumentLayoutConfigComponent implements OnInit {

  model: DocumentTemplateConfigModel;

  templateType = DocumentTemplateType;

  hoverTemplateType: DocumentTemplateType;

  constructor(
    private utilityService: UtilityService,
    private notificationService: NotificationService,
    private alertService: AlertService,
    private documentationService: DocumentationService
  ) { }

  ngOnInit(): void {

    this.documentationService.getDocumentTemplateConfigModel()
      .subscribe(
        (model: DocumentTemplateConfigModel) => {
          this.model = model;
        }
      );
  }

  changeMouseEnterTemplate(type: DocumentTemplateType): void {
    this.hoverTemplateType = type;
  }

  changeMouseLeaveTemplate(): void {
    this.hoverTemplateType = null;
  }

  changeSelectedTemplate(type: DocumentTemplateType): void {
    this.model.template = type;
  }

  submit(): void {

    this.documentationService.updateDocumentTemplateConfig(this.model)
      .subscribe(
        (response: ResponseModel) => {
          if (response.hasError) {
            this.alertService.setErrorAlert(response.msg);
            return;
          }
          this.notificationService.show(
            UtilityRix.getSuccsessNotification('Document Template updated successfully'));
          this.ngOnInit();
        }
      );
  }

}
