import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, MenuModule } from '../../shared';
import { ListaLogsComponent, LogAcessoComponent } from './components';

@NgModule({
  declarations: [ListaLogsComponent, LogAcessoComponent],
  imports: [CommonModule, SharedModule, MenuModule],
})
export class LogModule {}
