import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    var sortByDate;
    return sortByDate;
  }

}
