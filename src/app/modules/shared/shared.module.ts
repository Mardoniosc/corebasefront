import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  StorangeService,
  PerfilPermissaoService,
} from './services';
import { BarraDeMenuComponent, MenuModule } from './components';

@NgModule({
  declarations: [BarraDeMenuComponent],
  imports: [CommonModule, MenuModule],
  providers: [LoginService, StorangeService, PerfilPermissaoService],
  exports: [BarraDeMenuComponent],
})
export class SharedModule {}
