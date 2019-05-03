import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApi } from '../api/user.api';
import { User } from '../models/user';
import { Subject, asyncScheduler, Subscription, Observable } from 'rxjs';
import { switchMap, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: User[];
  searchTerm$ = new Subject<string>();
  debounce = 500;
  scheduler = asyncScheduler;
  searchUserSubscription: Subscription;

  constructor(private userApi: UserApi) {}

  ngOnInit() {
    this.searchUserSubscription = this.searchTerm$
      .pipe(
        tap(s => console.log('going to debounce for, ', this.debounce)),
        debounceTime(this.debounce, this.scheduler),
        switchMap(first => {
          console.log('searching via api');
          return this.userApi.searchUser(first);
        })
      )
      .subscribe(s => (this.users = s));
  }

  onKeyUp(first: string) {
    console.log('doing next on searchTerm$');
    this.searchTerm$.next(first);
  }
  ngOnDestroy(): void {
    if (this.searchUserSubscription) {
      this.searchUserSubscription.unsubscribe();
    }
  }
  search(first: string) {
    this.userApi.searchUser(first).subscribe(users => (this.users = users));
  }
}
