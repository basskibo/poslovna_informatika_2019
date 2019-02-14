import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_models";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../_services";
import {Globals} from "../globals";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private authenticationService: AuthenticationService;

  constructor(private globals: Globals) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  ngOnInit() {
    // this.currentUser = localStorage.setItem('getUser');
    let isThereUser = localStorage.getItem('currentUser');
    if (isThereUser) {
      this.globals.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.globals.session = JSON.parse(localStorage.getItem('session'));
      this.globals.isLoggedIn = true;
    }
    console.log(this.globals);
  }

  logoutUser (){
    console.log("loging out user");
    this.globals.currentUser = {};
    this.globals.session = '';
    this.globals.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('session');
  }

}
