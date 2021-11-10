import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user!: User;

  constructor(private _userService: UserService, private _router: Router) {
    this.user = _userService.user;
  }

  public logout() {
    this._userService.logout();
  }

  public search(term: string) {
    if (term.length === 0) {
      this._router.navigateByUrl('/dashboard');
    } else {
      this._router.navigateByUrl(`/dashboard/search/${term}`);
    }
  }
}
