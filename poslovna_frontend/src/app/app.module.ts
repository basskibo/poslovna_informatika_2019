import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { RegisterBankComponent } from './registerBank/registerBank.component';
import { LoginComponent } from './login';
import {JwtInterceptor} from "./_helpers";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component';

import {Globals} from './globals';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    RegisterBankComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Globals,
    {provide: HTTP_INTERCEPTORS , useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
