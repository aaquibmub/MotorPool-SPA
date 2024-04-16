import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelExportEvent, GridComponent } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';
import { ZonedDate } from '@progress/kendo-date-math';
import { Howl, Howler } from 'howler';
import { Subject } from 'rxjs';
import { ROUTES } from 'src/app/shared/sidebar/sidebar-routes.config';
import { RouteInfo } from 'src/app/shared/sidebar/sidebar.metadata';
import { LanguageKeys } from '../../common/language-keys';
import { DataImportStatus, DriverStatus, Gender, GetBooleanStatusForDropdownList, GetDriverStatusForDropdownList, GetGenderForDropdownList, GetOpmForDropdownList, GetTripDestinationForDropdownList, GetTripRouteForDropdownList, GetTripStatusForDropdownList, GetTripTypeForDropdownList, GetUserRoleTypeForDropdownList, GetVehicalStatusForDropdownList, OPM, SystemLogType, TripDestination, TripRoute, TripStatus, TripType, UserRoleType, VehicalStatus } from '../../common/shared-types';
import { UtilityRix } from '../../common/utility-rix';
import { CurrentUserModel } from '../../models/auth/current-user-model';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  language: LanguageKeys = new LanguageKeys();
  dropdownDefaultItem = { text: 'Please select..', value: '' };
  dropdownAllItem = { text: 'All', value: null };
  refreshData = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private intl: IntlService,
  ) { }

  setRefreshData(): void {
    this.refreshData.next(true);
  }

  scrollToFirstInvalidControl(
    element: ElementRef,
    container: string): void {
    let firstInvalidControl: HTMLElement = element.nativeElement.querySelector(
      'form .ng-invalid'
    );
    do {
      const firstInvalidChildControl = firstInvalidControl.querySelector('.ng-invalid');
      if (firstInvalidChildControl) {
        firstInvalidControl = firstInvalidChildControl as HTMLElement;
      } else {
        break;
      }
    } while (1);

    const containerOffset = $(container)?.offset()?.top;
    const top = firstInvalidControl.offsetTop - (containerOffset ?? 0);
    // const top = $('#' + firstInvalidControl.id).scrollTop() - containerOffset;
    $(container).animate({
      scrollTop: top - 100
    }, 1000);

    setTimeout(() => {

      $(firstInvalidControl).parents().map(function () {
        if (this.className === 'panel-content') {
          $('.' + this.className).hide();
          $(this).show();
        }
        return this.tagName;
      });

      firstInvalidControl.focus();
      firstInvalidControl.blur();
      firstInvalidControl.focus();

      const invalidInput = firstInvalidControl.querySelector('input');
      if (invalidInput && invalidInput.tagName === 'INPUT') {
        invalidInput.focus();
        invalidInput.blur();
        invalidInput.focus();
      }

    }, 1000);
  }

  buildFormData<T>(formData: FormData, data: T, parentKey?: string): void {
    if (Array.isArray(data)) {
      data.forEach((el) => {
        this.buildFormData(formData, el, parentKey);
      });
    } else if (typeof data === 'object'
      && !(data instanceof File)
      && !(data === null)
      && !(data instanceof Date)) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          (data as any)[key], parentKey ? `${parentKey}.${key}` : key);
      });

    } else {
      if (!data) {
        return;
      }

      const value = typeof data === 'boolean'
        || typeof data === 'number' ? data.toString() :
        (data instanceof Date ? data.toJSON() : data);

      formData.append(parentKey as string, value as string);
    }
  }

  redirectToUrl(uri: string): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  matches(el, selector): any {
    return (el.matches || el.msMatchesSelector).call(el, selector);
  }

  getSystemLogTypeLabel(type: SystemLogType): string {
    if (type === SystemLogType.Error) {
      return 'Error';
    }
    if (type === SystemLogType.Exception) {
      return 'Exception';
    }
    if (type === SystemLogType.Success) {
      return 'Success';
    }
    if (type === SystemLogType.Warning) {
      return 'Warning';
    }
    return '';

  }

  getUserRoleTypeLabel(value: UserRoleType): string {
    var statusList = GetUserRoleTypeForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getVehicalStatusLabel(value: VehicalStatus): string {
    var statusList = GetVehicalStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getDriverStatusLabel(value: DriverStatus): string {
    var statusList = GetDriverStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getGenderLabel(value: Gender): string {
    var statusList = GetGenderForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getOpmLabel(value: OPM): string {
    var statusList = GetOpmForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripTypeLabel(value: TripType): string {
    var statusList = GetTripTypeForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripDestinationLabel(value: TripDestination): string {
    var statusList = GetTripDestinationForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripRouteLabel(value: TripRoute): string {
    var statusList = GetTripRouteForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getTripStatusLabel(value: TripStatus): string {
    var statusList = GetTripStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  getBooleanStatusLabel(value: boolean): string {
    var statusList = GetBooleanStatusForDropdownList();
    var status = statusList.find(f => f.value == value);
    return status != null ? status.text : '';
  }

  formatDate(value: Date, args?: string): string {
    if (!value || value === null) {
      return '';
    }
    if (args) {
      const user = this.authService.getCurrentUser();
      let tzDate: ZonedDate = null;
      try {
        const dateValue = new Date(value);
        // const zone = zonesPerGroup(user.timeZoneID)[0];
        tzDate = ZonedDate.fromLocalDate(
          dateValue,
          'ar-SA');

      } catch (e) {
        console.log(e);
      }
      if (tzDate) {
        return this.intl.formatDate(tzDate.toUTCDate(), args);
      } else {
        const date = new Date(value);
        const utc = date.getTime() - (date.getTimezoneOffset() * 60000);
        const dateTime = new Date(utc);
        return this.intl.formatDate(dateTime, args);
      }
    }
    return this.intl.formatDate(new Date(value))
  }

  onExcelExport(ex: ExcelExportEvent, e: GridComponent): void {
    var data = e.data;
    var gridColumns = e.columns.toArray();
    var sheet = ex.workbook.sheets[0];
    var visibleGridColumns = [];
    var columnFields = [];
    var dataItem;

    gridColumns = gridColumns.sort((a, b) => a.orderIndex - b.orderIndex);
    // Get a list of visible columns
    for (var i = 0; i < gridColumns.length; i++) {
      if (!gridColumns[i].hidden) {
        visibleGridColumns.push(gridColumns[i]);
      }
    }

    // Create a collection of the column templates, together with the current column index
    for (var i = 0; i < visibleGridColumns.length; i++) {
      if (visibleGridColumns[i].field) {
        columnFields.push({ cellIndex: i, field: visibleGridColumns[i].field });
        // columnTemplates.push({ cellIndex: i, template: kendo.template(visibleGridColumns[i].template) });
      }
    }

    // Traverse all exported rows.
    for (var i = 1; i < sheet.rows.length; i++) {
      var row = sheet.rows[i];
      // Traverse the column templates and apply them for each row at the stored column position.

      // Get the data item corresponding to the current row.
      var dataIndex = i - 1;
      var dataItem = (data as any).data[dataIndex];
      for (var j = 0; j < columnFields.length; j++) {
        var columnField = columnFields[j];
        // Generate the template content for the current cell.
        var dataItemValue = dataItem[columnField.field];

        if (row.cells[columnField.cellIndex] != undefined)
          // Output the text content of the templated cell into the exported cell.
          switch (columnField.field) {
            case 'tripDate': {
              row.cells[columnField.cellIndex].value = this.formatDate(dataItemValue);
              break;
            }
            case 'dueDate': {
              row.cells[columnField.cellIndex].value = this.formatDate(dataItemValue);
              break;
            }
            case 'createdDate': {
              row.cells[columnField.cellIndex].value = this.formatDate(dataItemValue);
              break;
            }
            case 'pickupTime': {
              row.cells[columnField.cellIndex].value = this.formatDate(dataItemValue, 'hh:mm aa');
              break;
            }
            case 'opm': {
              row.cells[columnField.cellIndex].value = this.getOpmLabel(dataItemValue);
              break;
            }
            case 'gender': {
              row.cells[columnField.cellIndex].value = this.getGenderLabel(dataItemValue);
              break;
            }
            case 'passengerStatus': {
              row.cells[columnField.cellIndex].value = this.getBooleanStatusLabel(dataItemValue);
              break;
            }
            case 'destination': {
              row.cells[columnField.cellIndex].value = this.getTripDestinationLabel(dataItemValue);
              break;
            }
            case 'tripDestination': {
              row.cells[columnField.cellIndex].value = this.getTripDestinationLabel(dataItemValue);
              break;
            }
            case 'tripRoute': {
              row.cells[columnField.cellIndex].value = this.getTripRouteLabel(dataItemValue);
              break;
            }
            case 'driverStatus': {
              row.cells[columnField.cellIndex].value = this.getDriverStatusLabel(dataItemValue);
              break;
            }
            case 'armoured': {
              row.cells[columnField.cellIndex].value = dataItemValue == true ? 'Yes' : 'No';
              break;
            }
            case 'vehicleStatus': {
              row.cells[columnField.cellIndex].value = this.getVehicalStatusLabel(dataItemValue);
              break;
            }
            default: {
              row.cells[columnField.cellIndex].value = dataItemValue || "";
            }
          }
      }
    }
  }

  getDataImportStatusLabel(type: DataImportStatus): string {
    if (type === DataImportStatus.InProgress) {
      return 'InProgress';
    }
    if (type === DataImportStatus.Failed) {
      return 'Failed';
    }
    if (type === DataImportStatus.Completed) {
      return 'Completed';
    }
    return '';
  }

  playNotificationSound(): void {
    var sound = new Howl({
      src: ['/assets/notification-sound-1.wav']
    });

    sound.play();

    Howler.volume(1);

  }

  getRoleBasedMenuItems(user: CurrentUserModel, allItems: boolean): RouteInfo[] {

    let allRouteItems: RouteInfo[] = [];
    let roleBaseMenuItems: RouteInfo[] = [];

    if (!(user && user.permissions)) {
      return roleBaseMenuItems;
    }

    const sideBarItems = ROUTES.filter(f => f);
    allRouteItems.push(...sideBarItems);

    if (allItems) {
      allRouteItems.push(...UtilityRix.settingMenuItems);
    }

    roleBaseMenuItems.push(...allRouteItems.filter(f => user.permissions
      .findIndex(fi => fi.name === f.operation
        && fi.canView == true) !== -1));

    const adminPermissions = user.roleType == UserRoleType.Admin ?
      allRouteItems.filter(f => f.operation == null || f.operation == undefined || f.operation == '')
      : [];

    roleBaseMenuItems.push(...adminPermissions);

    return roleBaseMenuItems;
  }

}
