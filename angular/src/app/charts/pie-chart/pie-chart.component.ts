import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';
import { THEME_COLOURS } from 'src/shared/theme.colour';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {
  constructor() { }

  @Input() inputData: any; 
  @Input() limit: number; 


  //pie chart properties
  pieChartData: any[];
  pieChartLabels: any[];
  pieChartType: string = 'doughnut';
  colors: any[] = [
    {
      backgroundColor: this.themeColours(theme), //['#26547c', '#ff6b6b', '#ffd166', '#28a745', '#988d28' ],
      borderColor: '#111'
    }
  ];


  ngOnInit() {
    this.parseChartData(this.inputData, this.limit);
  }

  //Populate chart with data from the api.
  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit);
    this.pieChartData = allData.map(x => _.values(x)[1]);
    this.pieChartLabels = allData.map(x => _.values(x)[0]);
  }

  //Get theme colours by theme name. 
  themeColours(setName: string): string[] {
    const c = THEME_COLOURS.slice(0)
      .find(set => set.name === setName).colourSet;
    return c;
  }

}
