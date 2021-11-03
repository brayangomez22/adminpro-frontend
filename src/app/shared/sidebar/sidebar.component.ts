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
  public menuItems: any[];
  public user!: User;

  constructor(
    private _sidebarService: SidebarService,
    private _userService: UserService
  ) {
    this.menuItems = _sidebarService.menu;
    this.user = _userService.user;
  }

  public logout() {
    this._userService.logout();
  }
}
