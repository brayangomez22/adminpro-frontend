import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public user!: User;

  constructor(private _userService: UserService) {
    this.user = _userService.user;
  }

  public logout() {
    this._userService.logout();
  }
}
