import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registerBank',
  templateUrl: './registerBank.component.html',
  styleUrls: ['./registerBank.component.css']
})
export class RegisterBankComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  
}