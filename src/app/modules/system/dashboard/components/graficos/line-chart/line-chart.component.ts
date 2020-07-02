import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  lineChartData: ChartDataSets[];

  lineChartLabels: Label[];

  lineChartOptions;

  lineChartColors: Color[];

  lineChartLegend;

  lineChartPlugins = [];

  lineChartType;

  ngOnInit(): void {
    this.carregaDadosGrafico();
  }

  carregaDadosGrafico(): void {
    this.lineChartData = [
      { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
    ];

    this.lineChartLabels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];

    this.lineChartOptions = {
      responsive: true,
    };

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(150,255,0,0.28)',
      },
    ];

    this.lineChartLegend = true;

    this.lineChartPlugins = [];

    this.lineChartType = 'line';
  }
}
