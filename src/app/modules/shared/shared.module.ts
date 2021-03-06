import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  StorangeService,
  PerfilPermissaoService,
  UsuarioService,
  PerfilService,
  PermissaoService,
  UserLoggedService,
  UserGuardService,
  AuthGuardService,
  AutenticaRotaSerivce,
  HistoricoAcessoService,
} from './services';
import {
  BarraDeMenuComponent,
  MenuModule,
  NotFoundComponent,
} from './components';
import { MascaraDirective } from './directives';
import { CpfPipe } from './pipe';

@NgModule({
  declarations: [
    BarraDeMenuComponent,
    NotFoundComponent,
    MascaraDirective,
    CpfPipe,
  ],
  imports: [CommonModule, MenuModule],
  providers: [
    LoginService,
    StorangeService,
    PerfilPermissaoService,
    UsuarioService,
    PerfilService,
    PermissaoService,
    UserLoggedService,
    UserGuardService,
    AuthGuardService,
    AutenticaRotaSerivce,
    HistoricoAcessoService,
  ],
  exports: [BarraDeMenuComponent, NotFoundComponent, MascaraDirective, CpfPipe],
})
export class SharedModule {}
