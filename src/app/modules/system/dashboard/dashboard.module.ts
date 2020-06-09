import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent, DashboardComponent } from './components';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, RouterModule],
})
export class DashboardModule {}
