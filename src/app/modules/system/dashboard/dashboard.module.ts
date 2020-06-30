import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import {
  HomeComponent,
  DashboardComponent,
  BarChartComponent,
  BubbleChartComponent,
  DoughnutChartComponent,
  LineChartComponent,
  PieChartComponent,
  RadarChartComponent,
} from './components';
import { MenuModule, SharedModule } from '../../shared';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent,
  ],
  imports: [CommonModule, MenuModule, RouterModule, SharedModule, ChartsModule],
})
export class DashboardModule {}
