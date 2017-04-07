import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termURL'
})
export class TermURLPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    let result = [];
    for (let i = 0; i < value.length; i++) {
      switch (value[i]) {
        case "一":
          result.push(1);
          break;
        case "二":
          result.push(2);
          break;
        case "三":
          result.push(3);
          break;
        case "四":
          result.push(4);
          break;
        case "上":
          result.push(0);
          break;
        case "下":
          result.push(1);
          break;
        default:
      }
    }

    return result.join("-");
  }
}
