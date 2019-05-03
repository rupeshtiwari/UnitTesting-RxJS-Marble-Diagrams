import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserApi } from '../api/user.api';
import { FormsModule } from '@angular/forms';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../models/user';
import { Scheduler } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userApi: UserApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: UserApi,
          useValue: {
            getAllUsers: jest.fn(),
            searchUser: jest.fn()
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userApi = TestBed.get(UserApi);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('can search user by first name', () => {
    const expected$ = cold('-----a|', { a: [{ first: 'Rupesh' }] });
    userApi.searchUser = jest.fn(() => expected$);

    component.search('Rupesh');
    getTestScheduler().flush();
    expect(component.users).toEqual([{ first: 'Rupesh' } as User]);
  });

  xit('RACE CONDITION: can search user by first name', () => {
    userApi.searchUser = jest.fn(() =>
      cold('--------a|', { a: [{ first: 'Rupesh' }] })
    );

    component.search('Rupesh');

    userApi.searchUser = jest.fn(() =>
      cold('--b|', { b: [{ first: 'Ritesh' }] })
    );

    component.search('Ritesh');

    getTestScheduler().flush();

    expect(component.users).toEqual([{ first: 'Rupesh' } as User]);
  });

  xit('RACE CONDITION FIXED: can search user by first name', () => {
    userApi.searchUser = jest.fn(() =>
      cold('--------a|', { a: [{ first: 'Rupesh' }] })
    );

    component.onKeyUp('Rupesh');

    userApi.searchUser = jest.fn(() =>
      cold('--b|', { b: [{ first: 'Ritesh' }] })
    );

    component.onKeyUp('Ritesh');

    getTestScheduler().flush();

    expect(component.users).toEqual([{ first: 'Ritesh' } as User]);
  });

  it('Debounce before searching user by first name', () => {
    component.debounce = 30;
    const response = cold('--a|', { a: [{ first: 'Chandra' }] });
    const expected = cold('------b|', { b: [{ first: 'Chandra' }] });

    userApi.searchUser = jest.fn(() => response);
    const scheduler = getTestScheduler();
    component.scheduler = scheduler;

    fixture.detectChanges();
    component.onKeyUp('Chandra');
    scheduler.flush();

    expect(component.users).toEqual(expected.values['b']);
  });
});
