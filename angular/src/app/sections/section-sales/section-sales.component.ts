import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/shared/Service/order.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByPostCode: any;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.getOrderByCustomer();
    this.getOrderByPostCode();
  }

  getOrderByPostCode() {
    this._orderService.getOrdersByPostCode().subscribe(result => {
      this.salesDataByPostCode = result;
    });
  }

  getOrderByCustomer() {
    this._orderService.getOrdersByCustomer(5).subscribe(result => {
      this.salesDataByCustomer = result;
    });
  }
}
