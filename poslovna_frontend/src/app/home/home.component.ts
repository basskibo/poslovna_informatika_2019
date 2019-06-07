import { Component, OnInit } from '@angular/core';
import {Globals} from '../globals';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private globals: Globals,
    private router: Router) {
  }

  ngOnInit() {
    const userInSession = JSON.parse(localStorage.getItem('currentUser'));
    console.log(userInSession);
    if (userInSession) {
      this.router.navigate(['accounts']);
    }
  }


}
