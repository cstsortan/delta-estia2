import { Pipe, PipeTransform } from '@angular/core';
import { Instructor } from 'src/app/models/instructor';

@Pipe({
  name: 'instructors'
})
export class InstructorsPipe implements PipeTransform {

  transform(value: any): Instructor[] {
    const array: Instructor[] = [];
    if (value) {
      for (const i in value) {
        if (value.hasOwnProperty(i)) {
          array.push({
            ...(value[i]),
            id: i,
          });
        }
      }
    }
    return array;
  }
}
