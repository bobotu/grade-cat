import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { CustomReuseStrategy, rootRouterConfig } from './app.route';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AuthService } from './service/auth.service';
import { ShareModule } from './shared/share.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    ShareModule
  ],
  providers: [AuthService, {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
