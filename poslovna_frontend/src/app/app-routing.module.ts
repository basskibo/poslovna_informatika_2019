import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent} from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import {InvoiceDetailsComponent} from "./invoice-details/invoice-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path : 'register' , component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'invoice_details', component: InvoiceDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
