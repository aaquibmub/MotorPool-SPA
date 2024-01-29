import { UntypedFormControl } from '@angular/forms';
import { NotificationSettings } from '@progress/kendo-angular-notification';

export class UtilityRix {

  static bodyInspectionSide = {
    frontId: 'b6bfcb18-00b6-4a59-84e5-6e0e87c61a7a',
    backId: '1f84df08-ed57-482c-8b33-8961a3b783fa',
    roofId: 'b9077876-7883-4ac6-bb35-a315d861e1be',
    leftId: '3bd60e05-e22d-4e61-94b4-a600e0e6e645',
    rightId: 'ae5ab2d4-409c-4b7e-a3a8-9b6a2c2953bc',
  }

  static gridConfig = {
    gridData: {
      data: [],
      total: 0,
      aggregate: null
    },
    state: {
      take: 10,
      skip: 0,
      filter: null,
      aggregates: null,
    },
    pageable: {
      alwaysVisible: false,
      buttonCount: 3,
      responsive: true,
      info: false,
      pageSizes: [10, 20, 50, 100, 200, 300]
    },
    filterable: 'row',
  };

  static dropdownRequired(control: UntypedFormControl): { [s: string]: boolean } {
    if (control.value == null ||
      control.value.value === '') {
      return { dropdownRequired: true };
    }
    return null;
  }
  static getWarningNotification(msg: string): NotificationSettings {
    return {
      hideAfter: 1000,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'warning', icon: true },
      content: msg
    };
  }
  static getErrorNotification(msg: string): NotificationSettings {
    return {
      hideAfter: 1000,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true },
      content: msg
    };
  }
  static getSuccsessNotification(msg: string): NotificationSettings {
    return {
      hideAfter: 1000,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
      content: msg
    };
  }
}
