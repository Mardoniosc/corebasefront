import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ListaLogsComponent, LogAcessoComponent } from './components';

export const LogRoutes: Routes = [
  { path: 'log-pesquisar', component: ListaLogsComponent },
  { path: 'log-pesquisar-acesso', component: LogAcessoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(LogRoutes)],

  exports: [RouterModule],
})
export class LogRoutingModule {}
