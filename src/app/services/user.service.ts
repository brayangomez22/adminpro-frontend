import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = environment.base_url;
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  public googleInit() {
    return new Promise<void>((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '282378128284-klsdps4c0nq4emrfi0tbgmlb79sl6d92.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  public validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${this.base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((resp: any) => localStorage.setItem('token', resp.token)),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  public createUser(formDate: RegisterForm) {
    return this.http
      .post(`${this.base_url}/users`, formDate)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  public loginUser(formDate: LoginForm) {
    return this.http
      .post(`${this.base_url}/login`, formDate)
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  public loginUserWithGoggle(token: any) {
    return this.http
      .post(`${this.base_url}/login/google`, { token })
      .pipe(tap((resp: any) => localStorage.setItem('token', resp.token)));
  }

  public logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
