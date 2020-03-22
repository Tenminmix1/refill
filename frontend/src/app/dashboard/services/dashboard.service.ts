import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
/**
 * This Service calls the rails API to perform user for user CRUD
 */
@Injectable()
export class DashboardService {

  baseUrl = environment.api;
  constructor(protected http: HttpClient) { }

  fetchKpis(date) {
    return this.http.get(this.baseUrl + 'dashboard/kpis', { withCredentials: true, params: { date } });
  }

  fetchDonators(date) {
    return this.http.get(this.baseUrl + 'dashboard/donators', { withCredentials: true, params: { date } });
  }

  saveConfig(id, date, options) {
    return this.http.post(this.baseUrl + 'dashboard/blumo', { id, date, options }, { withCredentials: true });
  }

  fetchBlumoConfigs(date) {
    return this.http.get(this.baseUrl + 'dashboard/blumos', { withCredentials: true, params: { date } });
  }

  deleteBlumo(id) {
    return this.http.delete(this.baseUrl + 'dashboard/blumo', { withCredentials: true, params: { id } });
  }

  publishBlumo(id, options) {
    return this.http.post(this.baseUrl + 'dashboard/publishMail', { id, ...options }, { withCredentials: true });
  }

  fetchPublishedBlumos(date) {
    return this.http.get(this.baseUrl + 'dashboard/publishedBlumos', { withCredentials: true, params: { date } });
  }
}
