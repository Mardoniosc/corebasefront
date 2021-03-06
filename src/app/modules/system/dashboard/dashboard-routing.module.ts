import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, DashboardComponent } from './components';
import { AuthGuardService, AutenticaRotaSerivce } from '../../shared';

export const Dashboardoutes: Routes = [
  {
    path: 'dashboard',

    component: DashboardComponent,
    canActivate: [AuthGuardService, AutenticaRotaSerivce],

    children: [{ path: '', component: HomeComponent }],
  },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(Dashboardoutes)],

  exports: [RouterModule],
})
export class DashboardRoutingModule {}
