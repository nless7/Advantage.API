import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/shared/Service/order.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByPostcode: any;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.getOrderByPostCode();
    this.getOrderByCustomer();
  }

  getOrderByPostCode() {
    this._orderService.getOrdersByPostCode().subscribe(result => {
      this.salesDataByPostcode = result;
    });
  }

  getOrderByCustomer() {
    this._orderService.getOrdersByCustomer(5).subscribe(result => {
      this.salesDataByCustomer = result;
    });
  }
}
