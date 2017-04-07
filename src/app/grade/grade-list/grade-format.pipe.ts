import { Pipe, PipeTransform } from '@angular/core';
import { GradeDetail } from "../grade.model";

@Pipe({
  name: 'gradeFormat'
})
export class GradeFormatPipe implements PipeTransform {

  transform(value: GradeDetail, arg?: string): any {
    switch (arg) {
      case 'dev':
        return GradeFormatPipe.transformDev(value);
      case 'score':
        return GradeFormatPipe.transformScore(value);
      default:
        return GradeFormatPipe.transformScore(value);
    }
  }

  static transformScore(value: GradeDetail): string {
    if (value.isSpecial) {
      return value.special;
    }
    else if (value.score < 0) {
      return "-";
    } else {
      return value.score.toString();
    }
  }

  static transformDev(value: GradeDetail): string {
    if (value.isSpecial || value.score < 0) {
      return "-";
    } else if (value.dev > 0) {
      return '+' + value.dev.toFixed(2);
    } else {
      return value.dev.toFixed(2).toString();
    }
  }
}
