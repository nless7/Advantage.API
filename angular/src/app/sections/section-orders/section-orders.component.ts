import { Component, OnInit } from '@angular/core';
import { Order } from 'src/shared/Models/order';
import * as moment from 'moment';
import { OrderService } from 'src/shared/Service/order.service';
import { fail } from 'assert';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  orders: Order[];
  total: number = 0;
  page: number = 1;
  limit: number = 10;
  loading: boolean = false;

  //orders: Order[] = [
  //  {
  //    id: 'bdd979d7-f5b9-4961-8b1d-28ac29562037', customer: {
  //      id: '58efa717-aa49-4ff0-b42c-75b772bb326f', firstName: 'Ben', lastName: 'Johnson', postCode: 'GL2', email: 'mainst@example.com'
  //    }, total: 230, placed: this.convertDate(moment("2017-12-1")), completed: this.convertDate(moment("2017-12-14"))
  //  },
  //  {
  //    id: 'bc6bdf6c-8f9c-4385-8dcb-b063f44c1940', customer: {
  //      id: '8d381bb8-2c25-4ecd-a92f-42d142d62096', firstName: 'Ben', lastName: 'Johnson', postCode: 'GL2', email: 'mainst@example.com'
  //    }, total: 230, placed: this.convertDate(moment("2017-12-1")), completed: this.convertDate(moment("2017-12-3"))
  //  },
  //  {
  //    id: '22888cf2-e92c-4292-a9ac-5663cf396c3a', customer: {
  //      id: 'dd357309-4dda-4145-b9a0-5f73eb7aea31', firstName: 'Ben', lastName: 'Johnson', postCode: 'GL2', email: 'mainst@example.com'
  //    }, total: 230, placed: this.convertDate(moment("2017-12-1")), completed: this.convertDate(moment("2017-12-3"))
  //  },
  //  {
  //    id: '8d3b6008-7442-4030-9951-e7d6e0eed118', customer: {
  //      id: 'bf83a736-7bc2-41b3-850e-3554bfa9bdb5', firstName: 'Ben', lastName: 'Johnson', postCode: 'GL2', email: 'mainst@example.com'
  //    }, total: 230, placed: this.convertDate(moment("2017-12-1")), completed: this.convertDate(moment("2017-12-3"))
  //  },
  //  {
  //    id: '4507a253-a2c5-4a73-97ae-475d73cf3e8a', customer: {
  //      id: 'd4258bd6-3e67-4c29-af6a-84ffd1b307f6', firstName: 'Ben', lastName: 'Johnson', postCode: 'GL2', email: 'mainst@example.com'
  //    }, total: 230, placed: this.convertDate(moment("2017-12-1")), completed: this.convertDate(moment("2017-12-3"))
  //  },
  //  {
  //    id: '184a0413-8971-4e82-bc6f-13846412c6e7', customer: {
  //      id: 'a547c949-071f-4fd9-8f01-9936e6cbca50', firstName: 'Ben', lastName: 'Johnson', postCode: 'GL2', email: 'mainst@example.com'
  //    }, total: 230, placed: this.convertDate(moment("2017-12-1")), completed: this.convertDate(moment("2017-12-3"))
  //  }
  //];

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  /// <summary>
  /// Go to the previous page on the data table.
  /// </summary>
  goToPrevious(): void {
    this.page--;
    this.getOrders();
  }

  /// <summary>
  /// Go to the next page on the data table.
  /// </summary>
  goToNext(): void {
    this.page++;
    this.getOrders();
  }

  /// <summary>
  /// Go to the specific page on the data table.
  /// </summary>
  /// <param name="pageNumber">The page number.</param>
  goToPage(pageNumber: number): void {
    this.page = pageNumber;
    this.getOrders();
  }

  /// <summary>
  /// Convert the date format for display.
  /// </summary>
  /// <param name="date">The date.</param>
  /// <returns>The string.</returns>
  convertDate(date: moment.Moment) : string {
    return moment(date).format('DD/MM/YYYY');
  }

  getOrders(): void {
    this._orderService.getOrders(this.page, this.limit)
      .subscribe(result => {
        this.orders = result['page']['data'];
        this.total = result['page'].total;
        this.loading = false;
      });
  }

}
