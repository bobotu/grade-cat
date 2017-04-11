import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="show">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">
          <strong class="weui-dialog__title">{{ title }}</strong>
        </div>
        <div class="weui-dialog__bd">
          <ng-content></ng-content>
        </div>
        <div class="weui-dialog__ft">
          <a *ngIf="alternativeText != ''"
             (click)="onAlternative.emit()"
             class="weui-dialog__btn weui-dialog__btn_default">
            {{ alternativeText }}
          </a>

          <a *ngIf="confirmText != ''"
             (click)="onConfirm.emit()"
             class="weui-dialog__btn weui-dialog__btn_primary">
            {{ confirmText }}
          </a>
        </div>
      </div>
    </div>`
})
export class AlertComponent {
  @Input() show = false;
  @Input() title = '';
  @Input() confirmText = '确定';
  @Input() alternativeText = '';
  @Output('confirm') onConfirm = new EventEmitter<boolean>();
  @Output('alternative') onAlternative = new EventEmitter<boolean>();
}
