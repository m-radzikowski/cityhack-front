import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'btColor'
})
export class BtColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'POSITIVE':
        return 'success';
      case 'NEGATIVE':
        return 'danger';
      case 'NEUTRAL':
        return 'primary';
      default:
        return 'secondary';
    }
  }

}
