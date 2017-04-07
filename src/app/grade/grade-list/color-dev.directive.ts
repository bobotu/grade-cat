import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColorDev]'
})
export class ColorDevDirective {

  constructor(private el: ElementRef) {}

  @Input('appColorDev')
  set dev(dev: number) {
    if (dev > 0) {
      this.el.nativeElement.style.color = 'green';
    } else if (dev < 0) {
      this.el.nativeElement.style.color = 'red';
    } else {
      this.el.nativeElement.style.color = 'grey';
    }
  }
}
