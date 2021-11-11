import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { LoadUsers } from '../interfaces/load-users.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = environment.base_url;
  public auth2: any;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  public saveLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
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
    return this.http.get(`${this.base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { name, email, role, google, img, uid } = resp.user;
        this.user = new User(name, email, '', img, google, role, uid);

        this.saveLocalStorage(resp.token, resp.menu);

        return true;
      }),
      catchError((error) => of(false))
    );
  }

  public createUser(formDate: RegisterForm) {
    return this.http
      .post(`${this.base_url}/users`, formDate)
      .pipe(tap((resp: any) => this.saveLocalStorage(resp.token, resp.menu)));
  }

  public updateUser(formDate: {
    name: string;
    email: string;
    role: string | undefined;
  }) {
    formDate = {
      ...formDate,
      role: this.user.role,
    };

    return this.http.put(
      `${this.base_url}/users/${this.uid}`,
      formDate,
      this.headers
    );
  }

  public loginUser(formDate: LoginForm) {
    return this.http
      .post(`${this.base_url}/login`, formDate)
      .pipe(tap((resp: any) => this.saveLocalStorage(resp.token, resp.menu)));
  }

  public loginUserWithGoggle(token: any) {
    return this.http
      .post(`${this.base_url}/login/google`, { token })
      .pipe(tap((resp: any) => this.saveLocalStorage(resp.token, resp.menu)));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  public loadUsers(fron: number = 0) {
    const url = `${this.base_url}/users?from=${fron}`;
    return this.http.get<LoadUsers>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map(
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

        return {
          total: resp.total,
          users,
        };
      })
    );
  }

  public deleteUser(user: User) {
    const url = `${this.base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  public changeUser(user: User) {
    const url = `${this.base_url}/users/${user.uid}`;
    return this.http.put(url, user, this.headers);
  }
}
