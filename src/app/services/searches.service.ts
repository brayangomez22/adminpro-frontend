import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  private base_url = environment.base_url;
  public user!: User;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      (user) =>
        new User(
          user.name,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  private transformHospitals(results: any[]): Hospital[] {
    return results;
  }

  private transformDoctors(results: any[]): Doctor[] {
    return results;
  }

  public search(type: 'users' | 'doctors' | 'hospitals', term: string) {
    const url = `${this.base_url}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(resp.results);

          case 'hospitals':
            return this.transformHospitals(resp.results);

          case 'doctors':
            return this.transformDoctors(resp.results);

          default:
            return [];
        }
      })
    );
  }

  public searchGlobal(term: string) {
    const url = `${this.base_url}/all/${term}`;
    return this.http.get(url, this.headers);
  }
}
