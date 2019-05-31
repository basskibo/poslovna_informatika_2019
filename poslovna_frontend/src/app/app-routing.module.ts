import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {AccountsComponent} from './accounts/accounts.component';
import {RegisterComponent} from './register/register.component';
import {RegisterBankComponent} from './registerBank/registerBank.component';
import {PaymentOrderComponent} from './payment-order/payment-order.component';
import {LoginComponent} from './login/login.component';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  {path: 'accounts', component: AccountsComponent},
  { path : 'register' , component: RegisterComponent},
  {path: 'payment-order', component: PaymentOrderComponent},
  { path : 'login' , component: LoginComponent},
  { path : 'registerBank' , component: RegisterBankComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
