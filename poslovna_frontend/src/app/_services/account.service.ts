//acount.service.ts
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AccountService {

  url = "http://localhost:1337";

  constructor(private http: HttpClient) {

  }
  getAccounts() {
    return this.http.get(this.url+'/account')
  }
}
