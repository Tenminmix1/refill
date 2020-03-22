import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.sass']
})
export class UserOverviewComponent implements OnInit {

  constructor(
    private userManagementApiService: UserManagementService
  ) { }
  users = [];
  ngOnInit() {
    this.userManagementApiService.getAllUser().toPromise().then(users => {
      this.users = users;
    });
  }

}
