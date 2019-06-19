import { Pipe, PipeTransform } from '@angular/core';
import { visitAll } from '@angular/compiler';

@Pipe({
  name: 'contentType'
})
export class ContentTypePipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'notes') {
      return 'Σημειώσεις';
    } else if (value === 'questions') {
      return 'Θέματα';
    } else if (value === 'material') {
      return 'Ύλη Μαθήματος';
    } else if (value === 'useful') {
      return 'Χρήσιμα';
    }
    return 'Άλλο';
  }

}
