import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) {
      return null;
    }
    return getString(value.hours) + ':' + getString(value.minutes);
  }

}

function getString(number) {
  return number.toString().padStart(2, "0") // converts 2 to 02, 7 to 07
}
