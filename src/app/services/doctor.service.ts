import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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

  public loadDoctors(): Observable<Doctor[]> {
    const url = `${this.base_url}/doctors`;
    return this.http
      .get<{ ok: boolean; doctors: Doctor[] }>(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctors: Doctor[] }) => resp.doctors));
  }

  public createDoctor(doctor: Doctor) {
    return this.http.post(`${this.base_url}/doctors`, doctor, this.headers);
  }

  public updateDoctor(doctor: Doctor) {
    return this.http.put(
      `${this.base_url}/doctors/${doctor._id}`,
      doctor,
      this.headers
    );
  }

  public deleteDoctor(id: string) {
    const url = `${this.base_url}/doctors/${id}`;
    return this.http.delete(url, this.headers);
  }
}
