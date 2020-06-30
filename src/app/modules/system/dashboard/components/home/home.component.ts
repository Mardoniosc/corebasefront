import { Component, OnInit } from '@angular/core';

import * as CanvasJS from '../../../../../../assets/js/plugins/canvas/canvasjs.min.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.graficoEmLinha();
    this.graficoEmBarra();
    this.graficoPie();
  }

  graficoEmLinha() {
    const chart = new CanvasJS.Chart('lineChart', {
      animationEnabled: true,
      theme: 'light2',
      exportEnabled: true,
      data: [
        {
          type: 'line',
          dataPoints: [
            { y: 71, label: 'Apple' },
            { y: 55, label: 'Mango' },
            { y: 50, label: 'Orange' },
            { y: 65, label: 'Banana' },
            { y: 95, label: 'Pineapple' },
            { y: 68, label: 'Pears' },
            { y: 28, label: 'Grapes' },
            { y: 34, label: 'Lychee' },
            { y: 14, label: 'Jackfruit' },
          ],
        },
      ],
    });

    chart.render();
  }

  graficoEmBarra() {
    const chart = new CanvasJS.Chart('barChart', {
      animationEnabled: true,

      data: [
        {
          type: 'bar',
          axisYType: 'secondary',
          color: '#014D65',
          dataPoints: [
            { y: 3, label: 'Sweden' },
            { y: 7, label: 'Taiwan' },
            { y: 5, label: 'Russia' },
            { y: 9, label: 'Spain' },
            { y: 7, label: 'Brazil' },
            { y: 7, label: 'India' },
            { y: 134, label: 'US' },
          ],
        },
      ],
    });
    chart.render();
  }

  graficoPie() {
    const chart = new CanvasJS.Chart('doughnutChart', {
      animationEnabled: true,
      data: [
        {
          type: 'pie',
          startAngle: 240,
          yValueFormatString: '##0.00"%"',
          indexLabel: '{label} {y}',
          dataPoints: [
            { y: 79.45, label: 'Google' },
            { y: 7.31, label: 'Bing' },
            { y: 7.06, label: 'Baidu' },
            { y: 4.91, label: 'Yahoo' },
            { y: 1.26, label: 'Others' },
          ],
        },
      ],
    });
    chart.render();
  }
}
