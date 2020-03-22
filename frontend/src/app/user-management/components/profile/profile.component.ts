import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  fileToUpload: File = null;

  constructor(
    private userApiService: UserManagementService
  ) { }

  currentUser;
  ngOnInit() {
    this.userApiService.getProfile().toPromise().then(res => {
      this.currentUser = res;
    });
  }
}
