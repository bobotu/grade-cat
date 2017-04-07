import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;

  errMsg: string;
  isErr = false;

  constructor(private _router: Router,
              private _auth: AuthService) {}

  ngOnInit() {
    if (this._auth.token && this._auth.token != "") {
      this.onSuccess();
    }
  }

  login() {
    this.loading = true;
    this._auth.login(this.username, this.password)
      .subscribe(
        ok => ok ? this.onSuccess() : this.onError(),
        err => this.onError(err)
      )
  }

  onError(err?: any) {
    this.loading = false;
    this.isErr = true;
    this.errMsg = "密码错误，请重试"
  }

  onSuccess() {
    this._router.navigate(["/grade"], {replaceUrl: true})
  }

  onConfirm() {
    this.isErr = false
  }
}
