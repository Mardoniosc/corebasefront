import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule, MenuModule } from '../../shared';
import {
  ListaLogsComponent,
  LogAcessoComponent,
  LogComponent,
} from './components';

@NgModule({
  declarations: [ListaLogsComponent, LogAcessoComponent, LogComponent],
  imports: [CommonModule, SharedModule, MenuModule, RouterModule],
})
export class LogModule {}
