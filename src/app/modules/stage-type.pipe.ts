import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stageType'
})
export class StageTypePipe implements PipeTransform {
  transform(value: any): any {
    if (value === 'starter') {
      return 'Starter';
    }
    if (value === 'counter') {
      return 'Counter-pick';
    }
    return null;
  }
}
