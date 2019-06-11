import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  //pie chart properties
  pieChartData: number[] = [350, 450, 120];
  pieChartLabels: string[] = ['Example 1', 'Example 2', 'Example 3'];
  pieChartType: string = 'pie';
  colours: any[] = [
    {
      backgroundColor: ['#26547c', '#ff6b6b', '#ffd166'],
      borderColor: '#111'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
