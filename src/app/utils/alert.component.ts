import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
  selector: "app-alert",
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
          <a (click)="onConfirm.emit()" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
      </div>
    </div>`
})
export class AlertComponent {
  @Input() show: boolean = false;
  @Input() title: string = "";
  @Output('confirm') onConfirm = new EventEmitter<boolean>();
}
