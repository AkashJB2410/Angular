import { Component, OnInit, ViewChild } from '@angular/core';
import { Color, ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-timesheet-barchart',
  templateUrl: './timesheet-barchart.component.html',
  styleUrls: ['./timesheet-barchart.component.scss']
})
export class TimesheetBarchartComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  constructor() { }
  pie = false;
  line = false;
  bar = true;
  ngOnInit(): void {
  }
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Department1', 'Department2', 'Department3', 'Department4', 'Department5', 'Department6', 'Department7'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    // {data: [65, 59, 80, 81, 56, 55, 40], label: ''},
    { data: [28, 48, 40, 19, 86, 27, 90, 100], label: 'Hours' }
  ];

  chartClicked(e) {
    console.log("data" + e.active[0]._model.label)
  }

  // Pie
  public pieChartLabels: string[] = ['Department', 'Hours'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Hours' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Department' },
    // { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['Department1', 'Department2', 'Department3', 'Department4', 'Department5', 'Department6', 'Department7'];
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
