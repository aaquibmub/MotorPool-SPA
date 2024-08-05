import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateobject'
})
export class DateObjectPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value);
  }

}
