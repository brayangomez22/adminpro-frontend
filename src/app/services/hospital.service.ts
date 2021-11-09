import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private base_url = environment.base_url;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  public loadHospitals(): Observable<Hospital[]> {
    const url = `${this.base_url}/hospitals`;
    return this.http
      .get<{ ok: boolean; hospitals: Hospital[] }>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; hospitals: Hospital[] }) => resp.hospitals)
      );
  }

  public createHospital(name: string) {
    return this.http.post(`${this.base_url}/hospitals`, { name }, this.headers);
  }

  public updateHospital(id: string, name: string) {
    return this.http.put(
      `${this.base_url}/hospitals/${id}`,
      { name },
      this.headers
    );
  }

  public deleteHospital(id: string) {
    const url = `${this.base_url}/hospitals/${id}`;
    return this.http.delete(url, this.headers);
  }
}
