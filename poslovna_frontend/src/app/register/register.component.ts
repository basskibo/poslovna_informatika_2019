import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../globals';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isCentral = true;
  msg = '';

  constructor(
    private data: DataService, private globals: Globals,
    private formBuilder: FormBuilder, private userService: UserService,
    private router: Router
    ) { }

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

    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;
      this.loading = true;

      if (this.registerForm.invalid) {
        return;
      }
      console.log(this.isCentral +  this.f.email.value + this.f.password.value + this.f.name.value + this.f.address.value,
        this.f.pib.value, this.f.type.value, this.f.telephone.value, this.f.website.value);
      this.userService.register(
        this.f.email.value,
        this.f.password.value,
        this.f.name.value,
        this.f.address.value,
        this.f.city.value,
        this.f.country.value,
        this.f.pib.value,
        this.f.type.value,
        this.f.telephone.value,
        this.isCentral,
        this.f.website.value).pipe(first())
        .subscribe(
          data => {
            console.log('register successful!!');
            this.msg = 'Successfully added new ' + this.f.type.value;
            setTimeout(() => { this.router.navigate(['/login']); }, 3000);

          },
          error => {
            this.loading = false;
          });
    }

}
