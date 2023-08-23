import { Pipe, PipeTransform } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';

@Pipe({
  name: 'numericformat'
})
export class NumericFormatPipe implements PipeTransform {

  constructor(private intl: IntlService) {

  }

  transform(value: any, args?: any): any {
    const valueNumber = parseFloat(value);
    let formattedValue = '0.00';
    if (!isNaN(valueNumber)) {
      formattedValue = this.intl.formatNumber(value, args ?? '0.00');
      // formattedValue = valueNumber.toFixed(2);
    }
    return formattedValue;
  }

}
