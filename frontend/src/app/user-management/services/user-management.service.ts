import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
/**
 * This Service calls the rails API to perform user for user CRUD
 */
@Injectable()
export class UserManagementService {

  private baseUrl = environment.api;

  constructor(protected http: HttpClient) { }

  getProfile() {
    return this.http.get(this.baseUrl + 'users/profile', { withCredentials: true });
  }

  getAllUser() {
    return this.http.get<any[]>(this.baseUrl + 'users/overview', { withCredentials: true });
  }

  uploadProfilePicture(uploadPicture) {
    const formData = new FormData();
    formData.append('image', uploadPicture);
    return this.http.post(this.baseUrl + 'profile-picture', formData, { withCredentials: true });
  }
}
