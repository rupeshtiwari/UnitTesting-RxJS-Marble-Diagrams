import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressApi {
  url = 'http://localhost:3000/locations';

  constructor(private $http: HttpClient) {}

  getAllAddress(): Observable<any[]> {
    return this.$http.get(this.url) as Observable<any[]>;
  }

  getAddressById(id: number) {
    return this.$http.get(`${this.url}?id=${id}`) as Observable<any[]>;
  }
}
