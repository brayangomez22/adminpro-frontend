import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public formSubmitted = false;
  public auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private ngZone: NgZone
  ) {
    this.createReactiveForm();
  }

  ngOnInit(): void {
    this.renderButton();
  }

  private createReactiveForm(): void {
    this.loginForm = this.fb.group({
      email: [
        localStorage.getItem('email') || '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      remember: [false],
    });
  }

  public login() {
    this._userService.loginUser(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      (err) => Swal.fire('Error', err.error.msg, 'error')
    );
  }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  public async startApp() {
    await this._userService.googleInit();
    this.auth2 = this._userService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  public attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this._userService
          .loginUserWithGoggle(id_token)
          .subscribe((resp) =>
            this.ngZone.run(() => this.router.navigateByUrl('/'))
          );
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
