import { Component, OnInit } from '@angular/core';
import { click, dataBound } from '@syncfusion/ej2-angular-grids';
import { Color } from 'ng2-charts';
import 'chartjs-plugin-labels';

@Component({
  selector: 'app-state-timechart',
  templateUrl: './state-timechart.component.html',
  styleUrls: ['./state-timechart.component.scss']
})
export class StateTimechartComponent implements OnInit {
  dropdownchart;
  constructor() { }
  pie = false;
  line = false;
  bar = true;
  ngOnInit(): void {
  }
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaleShowValues: true,
    scaleValuePaddingX: 10,
    scaleValuePaddingY: 10,
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            if (data > 0) {
              ctx.fillText(data, bar._model.x, bar._model.y - 9);
            }
          });
        });
      }
    }
  };
  public barChartColors: Color[] = [
    {
      backgroundColor: ['rgb(255,0,0)', 'rgb(255, 255, 0)', 'rgb(255,0,0)', 'rgb(128, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 255, 0)', 'rgb(255, 255, 128)', 'rgb(128, 255, 0)'],
    },
  ]
  public barChartLabels: string[] = ['task 1', 'task name', 'Project name', 'Project name', 'Project name', 'Project name', 'Project name', 'Project name'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    { data: [28, 48, 40, 95, 86, 27, 90, 50, 70], label: 'Hours' }];


  chartClicked(e) {
    console.log("data" + e.active[0]._model.label)
  }
  // DropdownChart(e){
  //   this.dropdownchart = e.target.value
  //   console.log(e.target.value);
  // }
  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  showChart(value) {
    if (value == 'pie') {
      this.pie = true;
      this.bar = false;
      this.line = false;
    } else if (value == 'bar') {
      this.pie = false;
      this.bar = true;
      this.line = false;
    } else {

      this.pie = false;
      this.bar = false;
      this.line = true;

    }



  }

}