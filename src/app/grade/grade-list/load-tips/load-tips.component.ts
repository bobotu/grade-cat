import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-tips',
  templateUrl: './load-tips.component.html',
})
export class LoadTipsComponent {
  @Input() loading: boolean;

  constructor() { }
}
