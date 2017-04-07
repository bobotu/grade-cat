import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, Routes } from "@angular/router";
import { TabComponent } from "./tab.component";
import { GradesStatisticsComponent } from "./grades-statistics/grades-statistics.component";
import { GradeListComponent } from "./grade-list/grade-list.component";

export const gradeRouteConfig: Routes = [
  {
    path: "", component: TabComponent,
    children: [
      {path: "", pathMatch: "full", redirectTo: "grades-statistics"},
      {path: "my-grades", component: GradeListComponent},
      {path: "grades-statistics", component: GradesStatisticsComponent}
    ]
  }
];

export class CustomReuseStrategy implements RouteReuseStrategy {
  handlers: {[key: string]: DetachedRouteHandle} = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) return null;
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
