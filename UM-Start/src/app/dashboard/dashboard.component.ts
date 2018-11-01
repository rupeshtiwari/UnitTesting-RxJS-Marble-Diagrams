import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/user.api';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  constructor(private userApi: UserApi) {
    this.searchTerm$
      .pipe(switchMap(first => this.userApi.searchUser(first)))
      .subscribe(users => (this.users = users));
  }
  users = [];
  ngOnInit() {}

  search(first) {
    this.userApi.searchUser(first).subscribe(users => (this.users = users));
  }

  onKeyUp(first) {
    this.searchTerm$.next(first);
  }
}
