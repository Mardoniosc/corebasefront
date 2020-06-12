import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent, DashboardComponent } from './components';
import { MenuModule, SharedModule } from '../../shared';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, MenuModule, RouterModule, SharedModule],
})
export class DashboardModule {}
