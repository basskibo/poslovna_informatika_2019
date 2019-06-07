import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

// import { Object } from '../_models/payment_orders.model';

import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})

export class PaymentOrderComponent implements OnInit {
  // paymentOrders: Object = [] ;
  // paymentOrderTableDataSource = new MatTableDataSource(this.paymentOrders);
  displayedColumns: string[] = [
    'name',
    'path'
  ];

  constructor(private httpClient: HttpClient) {
  }



  ngOnInit() {
    this.httpClient.get('http://localhost:1337/get-all-transfer-orders?bank_id=1').subscribe((res) => {
      console.log(res);
      // this.paymentOrders = res;
      // this.paymentOrderTableDataSource.data = this.paymentOrders;
    });
  }

}
