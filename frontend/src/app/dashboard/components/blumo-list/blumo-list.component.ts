import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import * as moment from 'moment';
@Component({
  selector: 'app-blumo-list',
  templateUrl: './blumo-list.component.html',
  styleUrls: ['./blumo-list.component.sass']
})
export class BlumoListComponent implements OnInit, OnChanges {
  @Input() currentBlumo;
  @Input() date;
  lastUpdate = moment().format('DD.MM.YYYY HH:mm');
  blumos = [];
  amount = {};
  constructor(
    private dashboardApiService: DashboardService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) {
      this.refresh();
    }
  }

  refresh() {
    this.blumos = [];
    this.amount = [];
    this.dashboardApiService.fetchPublishedBlumos(this.date).toPromise().then(res => {
      this.blumos = res['blumos'];
      this.amount = res['amount'];
      this.blumos.forEach(blumo => {
        blumo['amount'] = this.amount[blumo._id];
      });
      this.lastUpdate = moment().format('DD.MM.YYYY HH:mm');
    });
  }
}
