import { UserApi } from './user.api';
import { cold } from 'jasmine-marbles';
import { HttpClient } from '@angular/common/http';

describe('UserApi', () => {
  let userApi: UserApi;
  let $http: HttpClient;

  beforeEach(() => {
    $http = {
      get: jest.fn(),
      put: jest.fn(),
      post: jest.fn()
    } as any;
    userApi = new UserApi($http);
  });

  it('userApi is defined', () => {
   
  });

  it('can return all users', () => {

  });
});
