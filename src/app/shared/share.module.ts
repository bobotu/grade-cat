import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlertComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    FeedbackComponent,
    FormsModule
  ]
})
export class ShareModule {
}
