import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  ListaLogsComponent,
  LogAcessoComponent,
  LogComponent,
} from './components';
import { AuthGuardService, AutenticaRotaSerivce } from '../../shared';

export const LogRoutes: Routes = [
  {
    path: 'log',
    component: LogComponent,
    canActivate: [AuthGuardService, AutenticaRotaSerivce],

    children: [
      { path: 'pesquisar', component: ListaLogsComponent },
      { path: 'pesquisar-acesso', component: LogAcessoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LogRoutes)],

  exports: [RouterModule],
})
export class LogRoutingModule {}
