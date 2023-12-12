import { Pipe, PipeTransform } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { ZonedDate } from '@progress/kendo-date-math';
import { AuthService } from '../services/auth/auth.service';

@Pipe({
  name: 'dateformat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(
    private authService: AuthService,
    private intl: IntlService
  ) {

  }

  transform(value: Date, args?: any): any {
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
    return this.intl.formatDate(new Date(value));
  }
}

