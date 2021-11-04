import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  public totalUsers: number = 0;
  public users: User[] = [];
  public from: number = 0;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.loadPaginatedUsers();
  }

  public loadPaginatedUsers() {
    this._userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
    });
  }

  public changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.loadPaginatedUsers();
  }
}
