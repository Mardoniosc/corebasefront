import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  PerfilComponent,
  AtualizarComponent,
} from './components';
import { AuthGuardService, AutenticaRotaSerivce } from '../../shared';

export const ProfileRoutes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'cadastrar',
        component: CadastrarComponent,
        canActivate: [AutenticaRotaSerivce],
      },
      {
        path: 'pesquisar',
        component: ListarComponent,
        canActivate: [AutenticaRotaSerivce],
      },
      { path: 'atualizar/:perfilId', component: AtualizarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProfileRoutes)],

  exports: [RouterModule],
})
export class ProfileRoutingModule {}
