import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent, DashboardComponent } from './components';
import { MenuModule } from '../../shared';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, MenuModule, RouterModule],
})
export class DashboardModule {}
