import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, DashboardComponent } from './components';

export const Dashboardoutes: Routes = [
  {
    path: 'dashboard',

    component: DashboardComponent,

    children: [{ path: '', component: HomeComponent }],
  },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(Dashboardoutes)],

  exports: [RouterModule],
})
export class DashboardRoutingModule {}
