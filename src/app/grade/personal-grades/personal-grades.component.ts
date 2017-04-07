import { Component, OnDestroy, OnInit } from '@angular/core';
import { GradesService } from "../../service/grades.service";
import { TermInfo } from "../grade.model";

@Component({
  selector: 'app-personal-grades',
  templateUrl: './personal-grades.component.html',
  styleUrls: ['./personal-grades.component.css']
})
export class PersonalGradesComponent implements OnInit, OnDestroy {
  meanHistoryScore: number[];
  meanHistoryLabels: string[];

  terms: TermInfo[];

  constructor(private _grades: GradesService) { }

  ngOnInit() {
    // this.initMeanHistory();
    // this.initTermList();
  }

  ngOnDestroy() {}

  // initMeanHistory() {
  //   this.meanHistoryScore = [];
  //   this.meanHistoryLabels = [];
  //
  //   return this._grades.getMeanHistory().subscribe(history => {
  //     history.forEach(v => {
  //       this.meanHistoryScore.push(v.score);
  //       this.meanHistoryLabels.push(v.term);
  //     })
  //   })
  // }
  //
  // initTermList() {
  //   return this._grades.getTermList().subscribe(terms => {
  //     this.terms = terms;
  //   })
  // }
}
