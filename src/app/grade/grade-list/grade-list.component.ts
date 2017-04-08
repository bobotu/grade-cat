import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GradeDetail, GradeDistribute } from "../grade.model";
import { GradesService } from "../../service/grades.service";
import { Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: "app-grade-list",
  templateUrl: "./grade-list.component.html",
  styleUrls: ["./grade-list.component.css"]
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
    legend: {position: 'right'},
  };
  loading: boolean;
  selectCourse = new Subject<string>();

  searching = false;
  search = new FormControl();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private _activatedRoute: ActivatedRoute,
              private _grades: GradesService) {
  }

  ngOnInit() {
    this.term = this._activatedRoute.snapshot.params["term"];
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
      })
  }

  trackByName(index: number, grade: GradeDetail) {
    return grade.name;
  }

  initDetails() {
    this.allDetails = [];

    if (this.term) {
      return this._grades.getTermGradeDetails(this.term).subscribe(details => {
        this.allDetails = this.currentDetails = details;
      })
    } else {
      return this._grades.getAllGradeDetails().subscribe(details => {
        this.allDetails = this.currentDetails = details;
      })
    }
  }

  showChart(data: GradeDistribute[]) {
    let counts = [];
    let labels = [];
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
