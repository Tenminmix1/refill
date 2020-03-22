import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit {
  date = moment(new Date()).local().format('YYYY-MM-DD').toString();
  selectedDate = moment(new Date()).local().format('YYYY-MM-DD').toString();
  minDate: Date;
  maxDate: Date;
  currentBlumo;
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(
    private dashboardApiService: DashboardService
  ) {
    this.minDate = new Date();
  }

  ngOnInit() { }

  onSearch() {
    this.date = moment(this.selectedDate).local().format('YYYY-MM-DD').toString();
  }

  changeCurrentId(id) {
    this.currentBlumo = id;
  }
}
