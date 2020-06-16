import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  ListaLogsComponent,
  LogAcessoComponent,
  LogComponent,
} from './components';

export const LogRoutes: Routes = [
  {
    path: 'log',
    component: LogComponent,
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
