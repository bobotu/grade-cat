import { Component, OnInit } from '@angular/core';
import { GradesService } from "../../service/grades.service";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-grades-statistics',
  templateUrl: './grades-statistics.component.html',
  styleUrls: ['./grades-statistics.component.css']
})
export class GradesStatisticsComponent implements OnInit {

  name: String;
  id: String;
  mean: String;
  rank: String;

  constructor(private _grades: GradesService,
              private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._grades.getName().subscribe(name => this.name = name);
    this._grades.getMean().subscribe(mean => this.mean = mean);
    this._grades.getRank().subscribe(rank => this.rank = rank);
    this._grades.getID().subscribe(id => this.id = id);
  }

  logout() {
    localStorage.clear();
    this._auth.clearToken();
    this._router.navigate(["/"], {replaceUrl: true})
  }
}
