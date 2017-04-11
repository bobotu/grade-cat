import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeDetail, GradeDistribute } from '../grade.model';
import { GradesService } from '../../service/grades.service';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent implements OnInit {
  term: string;
  allDetails: GradeDetail[];
  currentDetails: GradeDetail[];
  selectedCourse: string;

  gradeAnalysis: {data: number[], labels: string[]};
  gradeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {position: 'right'}
  };
  loading: boolean;
  selectCourse = new Subject<string>();

  searching = false;
  search = new FormControl();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private _activatedRoute: ActivatedRoute,
              private _grades: GradesService,
              private _auth: AuthService) {
  }

  ngOnInit() {
    this.term = this._activatedRoute.snapshot.params['term'];
    this.initDetails();

    this.selectCourse
      .distinctUntilChanged()
      .do(course => {
        this.loading = true;
        this.selectedCourse = course;
      })
      .switchMap(course => this._grades.getCourseAnalysis(course))
      .subscribe(dis => this.showChart(dis));

    this.search.valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .map(data => this.filterCourse(data))
      .subscribe(data => {
        this.currentDetails = data;
      });

    this._auth.onReset.subscribe(_ => {
      this.gradeAnalysis = {data: [], labels: []};
    });
  }

  trackByName(index: number, grade: GradeDetail) {
    return grade.name;
  }

  initDetails() {
    this.allDetails = [];

    if (this.term) {
      this._grades.getTermGradeDetails(this.term).subscribe(details => {
        this.allDetails = this.currentDetails = details;
      });
    } else {
      this._grades.getAllGradeDetails().subscribe(details => {
        this.allDetails = this.currentDetails = details;
      });
    }
  }

  showChart(data: GradeDistribute[]) {
    const counts = [];
    const labels = [];
    data.forEach(g => {
      counts.push(g.count);
      labels.push(g.label);
    });

    if (this.chart) {
      this.chart.chart.config.data.labels = labels;
    }
    this.gradeAnalysis = {data: counts, labels: labels};
    this.loading = false;
  }

  reset() {
    this.search.reset();
  }

  filterCourse(text: string) {
    if (text) {
      return this.allDetails.filter(el => el.name.indexOf(text) >= 0);
    } else {
      return this.allDetails;
    }
  }
}
