import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  PermissaoComponent,
} from './components';
import { AuthGuardService } from '../../shared';

export const PermitionRoutes: Routes = [
  {
    path: 'permissao',
    component: PermissaoComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'pesquisar', component: ListarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PermitionRoutes)],

  exports: [RouterModule],
})
export class PermitionRoutingModule {}
