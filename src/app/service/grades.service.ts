import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Observable } from 'rxjs/Observable';
import { GradeDetail, GradeDistribute } from '../grade/grade.model';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/timeoutWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';

const DATA_KEY = 'GRADES_RAW';
const VERSION_KEY = 'GRADES_VERSION';
const FETCH_TIMEOUT = 10000;

@Injectable()
export class GradesService implements OnDestroy {

  name: string;
  mean: string;
  rank: string;
  id: string;

  subjects: GradeDetail[];
  gradeDistribute: {[index: string]: GradeDistribute[]};

  done = new AsyncSubject<boolean>();
  resetSub: Subscription;

  constructor(private http: Http, private _auth: AuthService) {
    this.resetSub = this._auth.onReset.subscribe(_ => this.reset());
  }

  ngOnDestroy() {
    this.resetSub.unsubscribe();
  }

  fetchGradeData(): Observable<boolean> {
    console.log('ppm');
    const version = localStorage.getItem(VERSION_KEY);
    if (!version) {
      return this.fetchFromRemote()
        .timeoutWith(FETCH_TIMEOUT, Observable.of(false));
    }

    const data = {
      jwt: this._auth.token,
      version: parseInt(version, 10)
    };
    return this.http.post(`${environment.API_URL}/api/check`, data)
      .flatMap(_ => this.fetchFromLocal())
      .catch(err => {
        if (err.status === 401) {
          return Observable.throw(err);
        } else if (err.status === 410) {
          return this.fetchFromRemote();
        } else {
          return Observable.of(false);
        }
      })
      .timeoutWith(FETCH_TIMEOUT, Observable.of(false));
  }

  private fetchFromRemote(): Observable<boolean> {
    return this.http.post(`${environment.API_URL}/api/grades`, {jwt: this._auth.token})
      .map(resp => resp.json())
      .map(json => {
        const data = json['data'];
        const version = json['version'];
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
      const raw = localStorage.getItem(DATA_KEY);
      if (raw && raw !== '') {
        this.processGrades(JSON.parse(raw));
        ob.next(true);
      } else {
        ob.next(false);
      }
    }).do(result => {
      this.done.next(result);
      this.done.complete();
    });
  }

  private processGrades(data: any) {
    this.name = data['name'];
    this.mean = data['mean'];
    this.rank = data['rank'];
    this.id = data['id'];

    this.subjects = [];
    this.gradeDistribute = {};

    data['subjects'].forEach(subject => {
      this.gradeDistribute[subject['name']] = subject['distribute'];
      delete subject['distribute'];
      this.subjects.push(subject);
    });
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

  reset() {
    console.log('fuck');
    this.name = '';
    this.mean = '';
    this.rank = '';
    this.id = '';
    this.subjects = [];
    this.gradeDistribute = {};
    this.done = new AsyncSubject();
  }
}
