import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.sass']
})
export class PublishComponent implements OnInit {
  currentDateSettings = { date: '', from: '10:00', till: '18:00' };
  constructor(
    public dialogRef: MatDialogRef<PublishComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dashboardApiService: DashboardService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentDateSettings['date'] = this.data.date;
  }

  onPublish() {
    this.currentDateSettings.date = moment(this.currentDateSettings.date).format('YYYY-MM-DD') as any;
    const settings = { ...this.currentDateSettings, ...this.data.config };
    this.dashboardApiService.publishBlumo(this.data.id, settings).toPromise().then(res => {
      this.dialogRef.close(res);
      this.toastr.success(this.translateService.instant('DASHBOARD.PUBLISH.SUCCESS'));
    }).catch(error => {
      this.dialogRef.close(false);
      this.toastr.error(this.translateService.instant('DASHBOARD.PUBLISH.ERROR'));
    });
  }

}
