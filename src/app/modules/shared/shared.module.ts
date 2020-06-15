import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  StorangeService,
  PerfilPermissaoService,
  UsuarioService,
} from './services';
import {
  BarraDeMenuComponent,
  MenuModule,
  NotFoundComponent,
} from './components';

@NgModule({
  declarations: [BarraDeMenuComponent, NotFoundComponent],
  imports: [CommonModule, MenuModule],
  providers: [
    LoginService,
    StorangeService,
    PerfilPermissaoService,
    UsuarioService,
  ],
  exports: [BarraDeMenuComponent, NotFoundComponent],
})
export class SharedModule {}
