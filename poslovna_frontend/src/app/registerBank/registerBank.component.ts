import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../globals';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-registerBank',
  templateUrl: './registerBank.component.html',
  styleUrls: ['./registerBank.component.css']
})
export class RegisterBankComponent implements OnInit {
  countries; 
  registerNewBankForm: FormGroup;
  loading = false;
  submitted = false;
  msg = '';

  constructor(private http: HttpClient,private data: DataService, private formBuilder: FormBuilder, private globals: Globals, private router: Router) { }

  ngOnInit() {

    this.http.get("https://restcountries.eu/rest/v2/all")
    .pipe()
      .subscribe(
        response => {
          this.countries = JSON.stringify(response);
          console.log(this.countries.name);

        },
        error => {
          console.log("Ne Radi" + error);
          this.loading = false;
          this.userNotFound = true;
        });

    this.registerNewBankForm = this.formBuilder.group({
      pib: ["", [Validators.required, Validators.pattern('[0-9]{9}')]],
      bankName: ["", [Validators.required]],
      bankAddress: ["", [Validators.required]],
      state: [""],
      city: [""],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      bankWeb: [""],
      bankTelephone: [""],
      bankFax: [""],
      isBank: ["", Validators.required]
    });
  }

  get f() { return this.registerNewBankForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

  }

}