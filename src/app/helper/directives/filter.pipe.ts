import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], fields: string[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    let filteredItems = items;
    fields.forEach(f => {
      filteredItems = filteredItems.filter(item => item[f].some(filter) !== -1);
    });
    return filteredItems;
  }
}
