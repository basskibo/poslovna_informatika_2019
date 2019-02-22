import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../globals';
<<<<<<< HEAD
import { BankService } from '../_services';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';
=======
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {first} from 'rxjs/operators';
>>>>>>> bb6ec7907fbcfe41ee3abae10c064bbd72b4418d

@Component({
  selector: 'app-registerBank',
  templateUrl: './registerBank.component.html',
  styleUrls: ['./registerBank.component.css']
})
export class RegisterBankComponent implements OnInit {
<<<<<<< HEAD
  registerBankForm: FormGroup;
  loading = false;
  submitted = false;
  msg = '';

  constructor( private data: DataService, private globals: Globals,
    private formBuilder: FormBuilder, private bankService: BankService,
    private router: Router) { }

  ngOnInit() {
    this.registerBankForm = this.formBuilder.group({
    bankPIB: ['', [Validators.pattern('[0-9]{9}'), Validators.required]],
    bankName: ['', Validators.required],
    bankAddress: ['', Validators.required],
    bankCountry: ['', Validators.required],
    bankCity: ['', Validators.required],
    bankEmail: ['', [Validators.required, Validators.email]],
    bankWeb: ['', Validators.required],
    bankTelephone: ['', Validators.required],
    bankFax: ['', Validators.required],
    isCentral: ['', Validators.required]
    });
  }
  
  get f() { return this.registerBankForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.registerBankForm.invalid) {
      return;
    }

    console.log(this.f.bankPIB.value, this.f.bankName.value, this.f.bankAddress.value,
      this.f.bankCountry.value, this.f.bankCity.value, this.f.bankEmail.value,
      this.f.bankWeb.value, this.f.bankTelephone.value, this.f.bankFax.value,
      this.f.isCentral.value);
    this.bankService.register(
      this.f.bankPIB.value,
      this.f.bankName.value,
      this.f.bankAddress.value,
      this.f.bankCountry.value,
      this.f.bankCity.value,
      this.f.bankEmail.value,
      this.f.bankWeb.value,
      this.f.bankTelephone.value,
      this.f.bankFax.value,
      this.f.isCentral.value
      ).pipe(first())
      .subscribe(
        data => {
          console.log('Bank register successful!!');
          this.msg = 'Successfully added new ' + this.f.bankName.value;
          setTimeout(() => { this.router.navigate(['/']); }, 3000);
        },
        error => {
          this.loading = false;
        });
  }
}
=======
  countries;
  registerNewBankForm: FormGroup;
  loading = false;
  submitted = false;
  userNotFound = false;
  msg = '';

  constructor(private http: HttpClient, private data: DataService, private formBuilder: FormBuilder,
              private globals: Globals, private router: Router) {
  }

  ngOnInit() {

    this.http.get('https://restcountries.eu/rest/v2/all')
    .pipe()
      .subscribe(
        response => {
          this.countries = JSON.stringify(response);
          console.log(this.countries.name);

        },
        error => {
          console.log('Ne Radi' + error);
          this.loading = false;
          this.userNotFound = true;
        });

    this.registerNewBankForm = this.formBuilder.group({
      pib: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      bankName: ['', [Validators.required]],
      bankAddress: ['', [Validators.required]],
      state: [''],
      city: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      bankWeb: [''],
      bankTelephone: [''],
      bankFax: [''],
      isBank: ['', Validators.required]
    });
  }

  get f() { return this.registerNewBankForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

  }

}
>>>>>>> bb6ec7907fbcfe41ee3abae10c064bbd72b4418d
