import { Component, OnInit } from '@angular/core';
import { GradesService } from "../service/grades.service";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-main-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  isErr = false;
  loading: boolean;

  tabItems = [
    {
      name: "统计分析",
      img: "../../assets/statistics_icon.png",
      url: "grades-statistics"
    }, {
      name: "我的成绩",
      img: "../../assets/grades_icon.png",
      url: "my-grades"
    }];

  constructor(private _grades: GradesService,
              private _router: Router,
              private _auth: AuthService) {}

  ngOnInit() {
    if (!this._auth.token) {
      this.goLogin();
      return
    }
    this.fetch()
  }

  private fetch() {
    this.loading = true;
    this._grades.fetchGradeData()
      .subscribe(
        ok => ok ? this.onSuccess() : this.onError(),
        err => this.onError(err),
      )
  }

  retry() {
    this.isErr = false;
    this.fetch();
  }

  onSuccess() {
    this.loading = false;
    this.isErr = false;
  }

  onError(err?: any) {
    console.error(err);
    this.loading = false;
    this.isErr = true;

    if (err.status == 401) {
      this.goLogin()
    }
  }

  goLogin() {
    this._router.navigate(["/"], {replaceUrl: true})
  }
}
