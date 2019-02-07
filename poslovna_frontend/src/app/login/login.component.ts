import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_services";
import {first} from "rxjs/operators";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private data: DataService) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.minLength(6),Validators.required]]
    });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        });
  }

  
}
