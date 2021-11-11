import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._userService.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this._router.navigateByUrl('/dashboard');
      return false;
    }
  }
}
