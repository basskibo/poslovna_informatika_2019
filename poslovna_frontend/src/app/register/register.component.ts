import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globals } from '../globals';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isBank = true;

  constructor(private data: DataService,private globals: Globals,
    private formBuilder: FormBuilder, private userService: UserService) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        email: ["",[Validators.required, Validators.email]],
        password: ["",[Validators.minLength(6),Validators.required]],
        name: [""],
        address: [""],
        pib: ["",[Validators.pattern("[0-9]{9}"),Validators.required]],
        telephone: [""],
        type: ["", [Validators.required]],
        website: [""]
      });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;
      this.loading = true;

      if (this.registerForm.invalid) {
        return;
      }
      console.log(this.isBank +  this.f.email.value + this.f.password.value + this.f.name.value + this.f.address.value,
        this.f.pib.value,this.f.type.value,this.f.telephone.value,this.f.website.value)
      this.userService.register(
        this.f.email.value, 
        this.f.password.value, 
        this.f.name.value, 
        this.f.address.value, 
        this.f.pib.value, 
        this.f.type.value, 
        this.f.telephone.value, 
        this.isBank, 
        this.f.website.value).pipe(first())
        .subscribe(
          data => {
            console.log("register successful!!");
          },
          error => {
            this.loading = false;
          });
    }
  
}
