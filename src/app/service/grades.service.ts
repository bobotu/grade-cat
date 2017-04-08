import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, Subject } from "rxjs";
import { GradeDetail, GradeDistribute } from "../grade/grade.model";
import { Http } from "@angular/http";
import { AuthService } from "./auth.service";
import "rxjs/add/operator/map"
import "rxjs/add/operator/mapTo"
import { environment } from "../../environments/environment";

const API_URL = !environment.production ? "http://127.0.0.1:5000" : "";
const DATA_KEY = "GRADES_RAW";
const VERSION_KEY = "GRADES_VERSION";
const FETCH_TIMEOUT = 10000;

@Injectable()
export class GradesService {

  name: string;
  mean: string;
  rank: string;
  id: string;

  subjects: GradeDetail[];
  gradeDistribute: {[index: string]: GradeDistribute[]};

  done = new AsyncSubject<boolean>();

  constructor(private http: Http, private _auth: AuthService) {}

  fetchGradeData(): Observable<boolean> {
    let version = localStorage.getItem(VERSION_KEY);
    if (!version) {
      return this.fetchFromRemote()
        .timeoutWith(FETCH_TIMEOUT, Observable.of(false))
    }

    let data = {
      jwt: this._auth.token,
      version: parseInt(version),
    };
    return this.http.post(`${API_URL}/api/check`, data)
      .flatMap(_ => this.fetchFromLocal())
      .catch(err => {
        if (err.status == 401) {
          return Observable.throw(err)
        } else if (err.status == 410) {
          return this.fetchFromRemote()
        } else {
          return Observable.of(false)
        }
      })
      .timeoutWith(FETCH_TIMEOUT, Observable.of(false));
  }

  private fetchFromRemote(): Observable<boolean> {
    return this.http.post(`${API_URL}/api/grades`, {jwt: this._auth.token})
      .map(resp => resp.json())
      .map(json => {
        let data = json["data"];
        let version = json["version"];
        if (data && version) {
          localStorage.setItem(DATA_KEY, JSON.stringify(data));
          localStorage.setItem(VERSION_KEY, version);
          this.processGrades(data);
          return true;
        } else {
          localStorage.removeItem(VERSION_KEY);
          return false;
        }
      })
      .do(result => {
        this.done.next(result);
        this.done.complete();
      });
  }

  private fetchFromLocal(): Observable<boolean> {
    return new Observable<boolean>(ob => {
      let raw = localStorage.getItem(DATA_KEY);
      if (raw && raw != "") {
        this.processGrades(JSON.parse(raw));
        ob.next(true);
      } else {
        ob.next(false);
      }
    }).do(result => {
      this.done.next(result);
      this.done.complete();
    })
  }

  private processGrades(data: any) {
    this.name = data["name"];
    this.mean = data["mean"];
    this.rank = data["rank"];
    this.id = data["id"];

    this.subjects = [];
    this.gradeDistribute = {};

    data["subjects"].forEach(subject => {
      this.gradeDistribute[subject["name"]] = subject["distribute"];
      delete subject["distribute"];
      this.subjects.push(subject);
    })
  }

  getTermGradeDetails(term: string): Observable<GradeDetail[]> {
    return this.done.map(_ => this.subjects);
  }

  getAllGradeDetails(): Observable<GradeDetail[]> {
    return this.done.map(_ => this.subjects);
  }

  getCourseAnalysis(course: string): Observable<GradeDistribute[]> {
    return this.done.map(_ => this.gradeDistribute[course]);
  }

  getName(): Observable<string> {
    return this.done.map(_ => this.name);
  }

  getMean(): Observable<string> {
    return this.done.map(_ => this.mean);
  }

  getRank(): Observable<string> {
    return this.done.map(_ => this.rank);
  }

  getID(): Observable<string> {
    return this.done.map(_ => this.id);
  }
}
