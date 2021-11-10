import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchesService } from 'src/app/services/searches.service';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _searchesService: SearchesService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(({ term }) =>
      this.searchGlobal(term)
    );
  }

  public searchGlobal(term: string) {
    this._searchesService
      .searchGlobal(term)
      .subscribe(({ users, hospitals, doctors }: any) => {
        this.users = users;
        this.hospitals = hospitals;
        this.doctors = doctors;
      });
  }
}
