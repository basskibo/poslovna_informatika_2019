import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../globals';
import { BankService } from '../_services';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registerBank',
  templateUrl: './registerBank.component.html',
  styleUrls: ['./registerBank.component.css']
})
export class RegisterBankComponent implements OnInit {
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