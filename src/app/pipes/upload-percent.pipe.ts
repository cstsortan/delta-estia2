import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uploadPercent'
})
export class UploadPercentPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value);
  }

}
