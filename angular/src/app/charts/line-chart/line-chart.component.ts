import { Component, OnInit } from '@angular/core';
import { AppConsts } from 'src/shared/AppConsts';
import { OrderService } from 'src/shared/Service/order.service';
import * as moment from 'moment';

//const LINE_CHART_SAMPLE_DATA: any[] = [
//  { data: [32,14,46,23,38,56], label: 'Sentimate Analysis' },
//  { data: [12,18,26,13,28,26], label: 'Image Recognition' },
//  { data: [52,34,49,53,68,62], label: 'Forecasting' }
//];

//const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  topCustomer: string[];
  allOrders: any[];

  lineChartData: any[];// = LINE_CHART_SAMPLE_DATA;
  lineChartLabels: string[];// = LINE_CHART_LABELS;
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  lineChartColours = AppConsts.LINE_CHART_COLOURS;

  constructor(private _orderService: OrderService) { }

  ngOnInit() {

    //Get top 100 orders.
    this._orderService.getOrders(1, 100).subscribe(result => {
      this.allOrders = result['page']['data'];

      //Get top 3 customers names.
      this._orderService.getOrdersByCustomer(3).subscribe(cus => {

        //Get the top customer names.
        this.topCustomer = cus.map(x => x['firstName']);

        //Get orders placed and total for the top customers.
        const allChartData = this.topCustomer.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

        //Get dates for orders and insert it into a new array.
        let dates = allChartData.map(x => x.data).reduce((a, i) => {
          a.push(i.map(o => o[0]));
          return a;
        }, []);

        //Create a concatenated array of dates from the dates array.
        dates = [].concat.apply([], dates);

        //Customer order by a particular date.
        const r = this.getCustomerOrderByDate(allChartData, dates)['data'];

        //console.log(r);

        this.lineChartLabels = r[0].orders.map(o => o.date);

        this.lineChartData = [
          { 'data': r[0].orders.map(x => x.total), 'label': r[0].customer },
          { 'data': r[1].orders.map(x => x.total), 'label': r[1].customer },
          { 'data': r[2].orders.map(x => x.total), 'label': r[2].customer }
        ];
      });
    });
  }

  /// <summary>
  /// Get customer order by date.
  /// </summary>
  /// <param name="allChartData">The chart data.</param>
  /// <param name="dates">The dates.</param>
  /// <returns>The customer order.</returns>
  getCustomerOrderByDate(allChartData: any[], dates: any) {
    const customers = this.topCustomer;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    const u = Array.from(new Set(prettyDates)).sort();
    //console.log(u);

    //Define our result object to return.
    const result = {};
    const dataSets = result['data'] = [];

    //Iterate over each of the customers and build their order.

    //For each of our customers.
    customers.reduce((x, y, i) => {
     // console.log('Reducing:',y, 'at index', i)
      const customerOrders = [];

      //Build dataset object.
      dataSets[i] = {
        customer: y, orders:

          //For each order
          u.reduce((r, e, j) => {
            const obj = {};
            obj['date'] = e;
            obj['total'] = this.getCustomerDateTotal(e, y); // sum total orders for this customer on this day
            customerOrders.push(obj);
            //console.log('Reducing:', e, 'at index:', j, 'customerOrders', customerOrders);
            return customerOrders;
          })
      }

      return x;
    }, []);

    return result;
  }

  /// <summary>
  /// Get customer order date total and if a customer doesn't order anything for a particular day then return 0.
  /// </summary>
  /// <param name="date">The date.</param>
  /// <param name="customer">The customer.</param>
  /// <returns>The date and total or 0.</returns>
  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.firstName === customer
      && this.toFriendlyDate(o.placed) === date);

    //For each customer order
    //Handle dates where customer never made  any orders and handle multiple orders on the same day.
    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return result;
  }

  /// <summary>
  /// Get customer order date and total orders made.
  /// </summary>
  /// <param name="allOrders">All orders.</param>
  /// <param name="name">The customer name.</param>
  /// <returns>The customer.</returns>
  getChartData(allOrders: any, name: string): any {
    const customerOrders = allOrders.filter(o => o.customer.firstName === name);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    const result = { customer: name, data: formattedOrders };
    return result;
  }

  /// <summary>
  /// Converts the date to UK format.
  /// </summary>
  /// <param name="date">The date.</param>
  /// <returns>The date UK format.</returns>
  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('DD/MM/YY');
  }

}
