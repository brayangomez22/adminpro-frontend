import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  menuItems: any[];

  constructor(
    private _sidebarService: SidebarService,
    private _userService: UserService
  ) {
    this.menuItems = _sidebarService.menu;
  }

  public logout() {
    this._userService.logout();
  }
}
