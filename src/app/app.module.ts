import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.route";
import { LoginComponent } from "./auth/login/login.component";
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AuthService } from "./service/auth.service";
import { ShareModule } from "./share.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    ShareModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
