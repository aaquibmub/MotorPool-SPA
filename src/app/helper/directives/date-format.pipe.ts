import { Pipe, PipeTransform } from '@angular/core';
import { UtilityService } from '../services/common/utility.service';

@Pipe({
  name: 'dateformat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(
    private utilityService: UtilityService,
  ) {

  }

  transform(value: Date, args?: any): any {
    return this.utilityService.formatDate(value, args);
  }
}

