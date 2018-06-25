import { Pipe, PipeTransform } from '@angular/core';
// import moment = require("moment");
import * as moment from "moment";

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(new Date(value)).format("YYYY-MM-DD HH:mm");
  }

}
