import { ActivatedRouteSnapshot, DetachedRouteHandle, Routes, RouteReuseStrategy } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { Injectable } from '@angular/core';
import { AuthService } from './service/auth.service';
import { FeedbackComponent } from './shared/feedback/feedback.component';

export const rootRouterConfig: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: LoginComponent},
      {path: 'change', component: ChangePasswordComponent}
    ]
  },
  {path: 'grade', loadChildren: './grade/grade.module#GradeModule'},
  {path: 'feedback', component: FeedbackComponent}
];

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {
  handlers: {[key: string]: DetachedRouteHandle} = {};
  token: string;

  constructor(private _auth: AuthService) {}

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
    if (!route.routeConfig) {
      return null;
    }
    if (route.routeConfig.path.indexOf('/auth') >= 0) {
      return null;
    }

    if (this.token !== this._auth.token) {
      this.token = this._auth.token;
      this.handlers = {};
      return null;
    } else {
      return this.handlers[route.routeConfig.path];
    }
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
