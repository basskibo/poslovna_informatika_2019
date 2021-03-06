import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserSessionSubject: BehaviorSubject<User>;
  private currentUserTokenSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserSessionSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('sessionId')));
    this.currentUserTokenSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserTokenValue(): User {
    return this.currentUserTokenSubject.value;
  }

  public get currentUserSessionValue(): User {
    return this.currentUserSessionSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:1337/auth/login`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('sessionId', JSON.stringify(user.session));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }


  loginCb(email: string, password: string) {
    return this.http.post<any>(`http://localhost:1337/auth/cb-login`, {email, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('sessionId', JSON.stringify(user.session));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }


  logout(_id: string) {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('sessionId');
    this.currentUserSubject.next(null);

  }
}
