import { Component, OnInit } from '@angular/core';
import { states, surveys } from './survey-data';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.sass']
})
export class SurveyComponent implements OnInit {

  states = states;
  selectedState: string;
  surveys: any[];
  counter: number;
  result = '';

  constructor() { }

  ngOnInit(): void {
  }

  loadSurvey() {
    this.counter = 0;
    this.surveys = surveys[this.selectedState];
  }

  setAnswer(answer: string) {
    if (this.surveys[this.counter].correctanswer !== answer) {
      if (this.result !== 'negativ') {
        this.result = this.surveys[this.counter].quality;
      }
    }
    if (this.result === 'negativ') {
      this.counter = this.surveys.length;
    } else {
      this.counter++;
    }
  }
}
