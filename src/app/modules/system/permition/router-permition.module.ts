import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  PermissaoComponent,
  CreateNewComponent,
} from './components';
import { AuthGuardService, AutenticaRotaSerivce } from '../../shared';

export const PermitionRoutes: Routes = [
  {
    path: 'permissao',
    component: PermissaoComponent,
    canActivate: [AuthGuardService, AutenticaRotaSerivce],
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'pesquisar', component: ListarComponent },
      { path: 'criar-nova-permissao', component: CreateNewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PermitionRoutes)],

  exports: [RouterModule],
})
export class PermitionRoutingModule {}
