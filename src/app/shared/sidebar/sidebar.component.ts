import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  public user!: User;

  constructor(
    public sidebarService: SidebarService,
    private _userService: UserService
  ) {
    this.user = _userService.user;
  }

  public logout() {
    this._userService.logout();
  }
}
