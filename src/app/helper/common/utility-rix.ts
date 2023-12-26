import { UntypedFormControl } from '@angular/forms';
import { NotificationSettings } from '@progress/kendo-angular-notification';

export class UtilityRix {

  static gridConfig = {
    gridData: {
      data: [],
      total: 0,
    },
    state: {
      take: 20,
      skip: 0,
      filter: null
    },
    pageable: {
      alwaysVisible: false,
      buttonCount: 3,
      responsive: true,
      info: false,
      pageSizes: [20, 50, 100, 200, 300]
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
