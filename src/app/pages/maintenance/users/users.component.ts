import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public isLoading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private _userService: UserService,
    private _searchsService: SearchesService,
    private _modalService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.loadPaginatedUsers();
    this.imgSubs = this._modalService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadPaginatedUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public loadPaginatedUsers() {
    this.isLoading = true;
    this._userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.isLoading = false;
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

  public search(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
    } else {
      this._searchsService
        .search('users', term)
        .subscribe((results) => (this.users = results as User[]));
    }
  }

  public deleteUser(user: User) {
    if (user.uid === this._userService.uid) {
      Swal.fire('Error', 'You cannot delete your account', 'error');
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._userService.deleteUser(user).subscribe(() => {
            this.loadPaginatedUsers();
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          });
        }
      });
    }
  }

  public changeRole(user: User) {
    this._userService.changeUser(user).subscribe();
  }

  public openModal(user: User) {
    this._modalService.openModal('users', user.uid, user.img);
  }
}
