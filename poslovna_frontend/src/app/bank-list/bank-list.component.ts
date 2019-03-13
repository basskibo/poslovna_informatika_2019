import { Component, OnInit } from '@angular/core';
import { BankService } from '../_services';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {

  banks:any;

  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.bankService.getAll().subscribe( (data)=>{
      this.banks = data;
    })
  }

}
