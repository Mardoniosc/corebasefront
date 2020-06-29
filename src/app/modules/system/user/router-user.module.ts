import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  UsuarioComponent,
  PerfilUserComponent,
  AtualizarComponent,
} from './components';
import { AuthGuardService, AutenticaRotaSerivce } from '../../shared';

export const UserRoutes: Routes = [
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuardService, AutenticaRotaSerivce],
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'pesquisar', component: ListarComponent },
      { path: 'perfil', component: PerfilUserComponent },
      { path: 'atualizar/:userId', component: AtualizarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],

  exports: [RouterModule],
})
export class UserRoutingModule {}
