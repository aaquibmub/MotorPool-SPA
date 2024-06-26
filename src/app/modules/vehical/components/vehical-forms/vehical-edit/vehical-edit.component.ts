import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogRef, DialogService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { GetVehicalStatusForDropdownList, VehicalStatus } from 'src/app/helper/common/shared-types';
import { UtilityRix } from 'src/app/helper/common/utility-rix';
import { DropdownItem } from 'src/app/helper/models/common/dropdown/dropdown-item.model';
import { ResponseModel } from 'src/app/helper/models/common/response-model';
import { VehicalInspectionBodyPartItemModel } from 'src/app/helper/models/vehicals/inspections/vehical-inspection-body-side-item-model';
import { VehicalInspectionGeneralItemModel } from 'src/app/helper/models/vehicals/inspections/vehical-inspection-general-item-model';
import { VehicalModel } from 'src/app/helper/models/vehicals/vehical-model';
import { AlertService } from 'src/app/helper/services/common/alert.service';
import { CommonService } from 'src/app/helper/services/common/common.service';
import { UtilityService } from 'src/app/helper/services/common/utility.service';
import { VehicalTypeService } from 'src/app/helper/services/vehicals/vehical-type.service';
import { VehicalService } from 'src/app/helper/services/vehicals/vehical.service';

@Component({
  selector: 'app-vehical-edit',
  templateUrl: './vehical-edit.component.html',
  styleUrls: ['./vehical-edit.component.css']
})
export class VehicalEditComponent implements OnInit {

  id: string;
  editMode = false;
  model: VehicalModel;
  form: UntypedFormGroup;
  activeTab = 1;

  typeList: DropdownItem<string>[];
  statusList: DropdownItem<VehicalStatus>[];
  status = VehicalStatus;

  generalInspectionItems: VehicalInspectionGeneralItemModel[];
  bodyInspectionItems: VehicalInspectionBodyPartItemModel[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    public utilityService: UtilityService,
    private commonService: CommonService,
    private vehicalService: VehicalService,
    private vehicalTypeService: VehicalTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((params: Params) => {
        if (params.id != null) {
          this.id = params.id;
          this.vehicalService.get(params.id)
            .subscribe((model: VehicalModel) => {
              this.model = model;
              this.editMode = true;
              var inspection = this.model.inspection;
              this.generalInspectionItems = inspection ? inspection.generalInspectionItems : null;
              var bodyInspectionItems: VehicalInspectionBodyPartItemModel[] = [];
              if (inspection && inspection.bodyInspectionItems) {
                inspection.bodyInspectionItems.forEach(f => {
                  f.parts.forEach(p => {
                    bodyInspectionItems.push(p);
                  });
                });
              }
              this.bodyInspectionItems = bodyInspectionItems;
              this.initForm();
            });
        } else {
          this.initForm();
        }
      });

    this.vehicalTypeService.getDropdownList('')
      .subscribe((list: DropdownItem<string>[]) => {
        this.typeList = list;
      });

    this.statusList = GetVehicalStatusForDropdownList();

  }

  private initForm(): void {

    let vehicalIdStr: string = '<auto-generated>';
    let registrationPlate: string = null;
    let status: DropdownItem<VehicalStatus> = null;
    let grippedBy: string = null;
    let make: string = null;
    let model: string = '';
    let modelYear: number = null;
    let type: DropdownItem<string> = null;
    let color: string = null;
    let armoured: boolean = false;

    let engineOilCapacity: number = null;
    let recommendedOilBrand: string = null;
    let oilNextDueMilage: number = null;
    let oilNextDueDate: string = null;
    let oilComments: string = null;

    let rimSize: string = null;
    let tyreSize: string = null;
    let tireBrand: string = null;
    let tyreExpiryDate: Date = null;
    let tyreComments: string = null;

    let odoMeter: number = null;
    let odoMeterComments: string = null;

    if (this.model) {
      vehicalIdStr = this.model.vehicalIdStr;
      registrationPlate = this.model.registrationPlate;
      status = this.model.status;
      grippedBy = this.model.grippedBy;
      make = this.model.make;
      model = this.model.model;
      modelYear = this.model.modelYear;
      type = this.model.type;

      color = this.model.color;
      armoured = this.model.armoured;

      engineOilCapacity = this.model.engineOilCapacity;
      recommendedOilBrand = this.model.recommendedOilBrand;
      oilNextDueMilage = this.model.oilNextDueMilage;
      oilNextDueDate = this.model.oilNextDueDate;
      oilComments = this.model.oilComments;

      rimSize = this.model.rimSize;
      tyreSize = this.model.tyreSize;
      tireBrand = this.model.tireBrand;
      tyreExpiryDate = this.model.tyreExpiryDate;
      tyreComments = this.model.tyreComments;

      odoMeter = this.model.odoMeter;
      odoMeterComments = this.model.odoMeterComments;

    }

    this.form = new UntypedFormGroup({
      vehicalIdStr: new UntypedFormControl(
        vehicalIdStr, [Validators.required]),
      registrationPlate: new UntypedFormControl(
        registrationPlate, [Validators.required]),
      status: new UntypedFormControl(
        status, [UtilityRix.dropdownRequired as ValidatorFn]),
      grippedBy: new UntypedFormControl(grippedBy),
      make: new UntypedFormControl(
        make, [Validators.required]),
      model: new UntypedFormControl(
        model, [Validators.required]),
      modelYear: new UntypedFormControl(
        modelYear, [Validators.required]),
      type: new UntypedFormControl(
        type, [UtilityRix.dropdownRequired as ValidatorFn]),
      color: new UntypedFormControl(
        color, [Validators.required]),
      armoured: new UntypedFormControl(
        armoured, [Validators.required]),

      engineOilCapacity: new UntypedFormControl(engineOilCapacity),
      recommendedOilBrand: new UntypedFormControl(recommendedOilBrand),
      oilNextDueMilage: new UntypedFormControl(oilNextDueMilage),
      oilNextDueDate: new UntypedFormControl(
        oilNextDueDate ? new Date(oilNextDueDate) : new Date()
      ),
      oilComments: new UntypedFormControl(oilComments),

      rimSize: new UntypedFormControl(rimSize),
      tyreSize: new UntypedFormControl(tyreSize),
      tireBrand: new UntypedFormControl(tireBrand),
      tyreExpiryDate: new UntypedFormControl(
        tyreExpiryDate ? new Date(tyreExpiryDate) : new Date()),
      tyreComments: new UntypedFormControl(tyreComments),

      odoMeter: new UntypedFormControl(odoMeter),
      odoMeterComments: new UntypedFormControl(odoMeterComments),
    });

  }

  cancel(): void {
    this.router.navigate(['/vehicals/pool/all/']);
  }

  submit(): void {
    if (!this.form.valid) {
      this.utilityService.scrollToFirstInvalidControl(this.el, '.page-wrapper');
      return;
    }

    const formValue = this.form.value as VehicalModel;
    formValue.id = this.id;
    const primaryAction = this.editMode ? 'Update' : 'Create';
    const successAction = this.editMode ? 'Updated' : 'Created';
    const primaryMsg = 'Do you want to ' + primaryAction + ' vehical?';

    const dialog: DialogRef = this.dialogService
      .open(this.alertService.getConfirmDialougeConfig(
        'Confirm ' + primaryAction, primaryMsg, primaryAction));

    dialog.result.subscribe((result: any) => {
      if (result.text === primaryAction) {
        this.vehicalService.addUpdate(formValue)
          .subscribe(
            (response: ResponseModel<string>) => {

              if (response.hasError) {
                this.alertService.setErrorAlert(response.msg);
                return;
              }

              this.alertService.setSuccessAlert(
                'Vehical is '
                + successAction
                + ' successfully');

              this.utilityService.redirectToUrl('/vehicals/pool/all');

            }
          );
      }
    });
  }

  setActiveTab(active: number): void {
    this.activeTab = active;
  }

  hasGeneralInspection(): boolean {
    return this.generalInspectionItems
      && this.generalInspectionItems.length > 0;
  }

  onGeneralInspectionSearch(query: KeyboardEvent): void {
    var value = (query.currentTarget as HTMLInputElement).value;
    this.generalInspectionItems = this.model.inspection.generalInspectionItems
      .filter(f => f.option.text.toLocaleLowerCase().includes(value));
  }

  hasBodyInspection(): boolean {
    return this.generalInspectionItems
      && this.generalInspectionItems.length > 0;
  }

  onBodyInspectionSearch(query: KeyboardEvent): void {
    var value = (query.currentTarget as HTMLInputElement).value;

    var bodyInspectionItems: VehicalInspectionBodyPartItemModel[] = [];
    if (this.model.inspection && this.model.inspection.bodyInspectionItems) {
      this.model.inspection.bodyInspectionItems.forEach(f => {
        f.parts.forEach(p => {
          bodyInspectionItems.push(p);
        });
      });
    }
    this.bodyInspectionItems = bodyInspectionItems.filter(f => f.part.text.toLocaleLowerCase().includes(value));
  }

}
