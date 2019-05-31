import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Globals} from '../globals';
import {UserService} from '../_services';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})

export class PaymentOrderComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isCentral = true;
  msg = '';

  constructor(
    private data: DataService, private globals: Globals,
    private formBuilder: FormBuilder, private userService: UserService,
    private router: Router
  ) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      name: [''],
      address: [''],
      city: [''],
      country: [''],
      pib: ['', [Validators.pattern('[0-9]{9}'), Validators.required]],
      telephone: [''],
      type: ['', [Validators.required]],
      website: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    return;
  }

}
