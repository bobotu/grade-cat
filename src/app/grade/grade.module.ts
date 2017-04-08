import { TabComponent } from "./tab.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { gradeRouteConfig } from "./grade.route";
import { CommonModule } from "@angular/common";
import { GradeListComponent } from "./grade-list/grade-list.component";
import { PersonalGradesComponent } from './personal-grades/personal-grades.component';
import { GradesStatisticsComponent } from './grades-statistics/grades-statistics.component';
import { ChartsModule } from "ng2-charts";
import { GradesService } from "../service/grades.service";
import { TermURLPipe } from './utils/term-url.pipe';
import { GradeFormatPipe } from './grade-list/grade-format.pipe';
import { ColorDevDirective } from './grade-list/color-dev.directive';
import { LoadTipsComponent } from './grade-list/load-tips/load-tips.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "../share.module";

@NgModule({
  declarations: [
    TabComponent,
    GradeListComponent,
    PersonalGradesComponent,
    GradesStatisticsComponent,
    TermURLPipe,
    GradeFormatPipe,
    ColorDevDirective,
    LoadTipsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(gradeRouteConfig),
    ChartsModule,
    ShareModule
  ],
  exports: [
    TabComponent
  ],
  providers: [GradesService]
})
export class GradeModule {
}
