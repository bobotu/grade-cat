import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";

export const rootRouterConfig: Routes = [
  {path: "", pathMatch: "full", redirectTo: "auth"},
  {
    path: "auth",
    children: [
      {path: "", pathMatch: "full", redirectTo: "login"},
      {path: "login", component: LoginComponent},
      {path: "change", component: ChangePasswordComponent}
    ]
  },
  {path: "grade", loadChildren: "./grade/grade.module#GradeModule"}
];
