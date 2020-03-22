import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefillService {

  constructor(private http: HttpClient) { }

  addDonator(data) {
    return this.http.post(environment.api + 'refill/add-donator', data);
  }

  getDonationCenters(data): Observable<any[]> {
    return this.http.post<any[]>(environment.api + 'refill/find-donation-centers', data);
  }
}
