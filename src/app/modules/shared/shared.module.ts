import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  StorangeService,
  PerfilPermissaoService,
} from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginService, StorangeService, PerfilPermissaoService],
})
export class SharedModule {}
