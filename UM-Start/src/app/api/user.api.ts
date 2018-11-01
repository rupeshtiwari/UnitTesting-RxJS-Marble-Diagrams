import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { log } from '../utility/logger';

@Injectable({ providedIn: 'root' })
export class UserApi {
  url = 'http://localhost:3000/users';

  constructor(private $http: HttpClient) {}

  getAllUsers() {
    return this.$http.get<User[]>(this.url);
  }

  getUserById(id: string) {
    log(`getUserById url: ${this.url}/${id}`);

    return this.$http.get(`${this.url}/${id}`);
  }

  saveUser(user: User) {
    if (user.id) {
      return this.updateUser(user);
    } else {
      return this.createUser(user);
    }
  }

  updateUser(user: User) {
    log(`updateUser url: ${this.url}/${user.id}`, user);

    return this.$http.put(`${this.url}/${user.id}`, user);
  }

  createUser(user: User) {
    log(`createUser url: ${this.url}`, user);
    user.id = this.nextId();

    return this.$http.post(`${this.url}`, user);
  }

  searchUser(name: string) {
    console.log(`searchUser url: ${this.url}?first_like=${name}`);

    return this.$http.get<User[]>(`${this.url}?first_like=${name}`);
  }

  nextId() {
    return new Date().getTime().toString(36);
  }
}
