import { UntypedFormControl } from '@angular/forms';

export class UtilityRix {

  static dropdownRequired(control: UntypedFormControl): { [s: string]: boolean } {
    if (control.value == null ||
      control.value.value === '') {
      return { dropdownRequired: true };
    }
    return null;
  }
}
