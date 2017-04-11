import { Routes } from '@angular/router';
import { TabComponent } from './tab.component';
import { GradesStatisticsComponent } from './grades-statistics/grades-statistics.component';
import { GradeListComponent } from './grade-list/grade-list.component';

export const gradeRouteConfig: Routes = [
  {
    path: '', component: TabComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'grades-statistics'},
      {path: 'my-grades', component: GradeListComponent},
      {path: 'grades-statistics', component: GradesStatisticsComponent}
    ]
  }
];

