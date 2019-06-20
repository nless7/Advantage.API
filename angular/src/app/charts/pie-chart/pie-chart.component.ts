import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() inputData: any; 
  @Input() limit: number; 


  //pie chart properties
  pieChartData: number[];
  pieChartLabels: string[];
  pieChartType: string = 'doughnut';
  colours: any[] = [
    {
      backgroundColor: ['#26547c', '#ff6b6b', '#ffd166', '#28a745', '#988d28' ],
      borderColor: '#111'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.parseChartData(this.inputData, this.limit);
  }

  //Populate chart with data from the api.
  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

}
