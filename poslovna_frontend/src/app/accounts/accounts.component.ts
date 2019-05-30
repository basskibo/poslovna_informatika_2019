import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services';
import {first} from 'rxjs/operators';
import {Globals} from '../globals';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  userNotFound = false;

  constructor(
    private globals: Globals,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private data: DataService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });

  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
  }


}
