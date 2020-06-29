import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  PerfilComponent,
} from './components';
import { AuthGuardService, AutenticaRotaSerivce } from '../../shared';

export const ProfileRoutes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuardService, AutenticaRotaSerivce],
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'pesquisar', component: ListarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProfileRoutes)],

  exports: [RouterModule],
})
export class ProfileRoutingModule {}
