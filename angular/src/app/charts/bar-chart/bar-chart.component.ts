import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { OrderService } from 'src/shared/Service/order.service';
import * as moment from 'moment';

//const SAMPLE_BARCHART_DATA: any[] = [
//  {data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales'},
//  {data: [25, 39, 60, 91, 36, 54, 50], label: 'Q4 Sales'}
//];

//const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  //properties
  orders: any;
  orderLabels: string[];
  orderData: number[];

  barChartData: any[];
  barChartLabels: string[];
  barChartType = 'bar';
  barChartLegend = true;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor(private _orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  /// <summary>
  /// Get orders to be displayed in the bar chart.
  /// </summary>
  getOrders() {
      this._orderService.getOrders(1, 100)
          .subscribe(result => {
              //console.log(result['page']['data']);
              const localChartData = this.getChartData(result);
              this.barChartLabels = localChartData.map(x => x[0]).reverse();
              this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Sales' }];
          });
  }

  /// <summary>
  /// Parse the response and get data structure for building the chart.
  /// </summary>
  /// <param name="result">The result.</param>
  getChartData(result: Response) {
    this.orders = result['page']['data'];
    const data = this.orders.map(o => o.total);
    const labels = this.orders.map(o => moment(o.placed).format('DD/MM/YY'));
    const formattedOrders = this.groupByDateAndOrderTotal();
    const chartData = this.filterOrders(formattedOrders);

    //Get sum of numbers in the array.
    //const myData = [3, 4, 5].reduce((sum, value) => {
    //  return sum + value;
    //}, 0);

    //Another example of the reduce function.
    //const total = [0, 1, 2, 3].reduce(function (a, b) {
    //  return a + b;
    //});
    //console.log("total is : " + total);

    return chartData;
  }

  /// <summary>
  /// Group by date and order total for that particular day.
  /// </summary>
  /// <param name="formattedOrders">The formattedOrders.</param>
  filterOrders(formattedOrders: any) {
      const listArray = [];
      const chartData = formattedOrders.reduce((r, e) => {
          const date = e[0];
          const orderTotal = e[1];
          if (!listArray[date]) {
              listArray[date] = e;
              r.push(listArray[date]);
          }
          else {
              listArray[date][1] += orderTotal;
          }
          return r;
      }, []);
      return chartData;
  }

  /// <summary>
  /// Group date and order total.
  /// </summary>
  groupByDateAndOrderTotal() {
      return this.orders.reduce((r, e) => {
          r.push([moment(e.placed).format('DD/MM/YY'), e.total]);
          return r;
      }, []);
  }
}
