import { UntypedFormControl } from '@angular/forms';

export class UtilityRix {

  static gridConfig = {
    gridData: {
      data: [],
      total: 0,
    },
    state: {
      take: 10,
      skip: 0
    },
    pageable: {
      alwaysVisible: false,
      buttonCount: 3,
      responsive: true,
      info: false
    }
  };

  static dropdownRequired(control: UntypedFormControl): { [s: string]: boolean } {
    if (control.value == null ||
      control.value.value === '') {
      return { dropdownRequired: true };
    }
    return null;
  }
}
