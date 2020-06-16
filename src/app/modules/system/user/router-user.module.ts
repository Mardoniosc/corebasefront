import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  UsuarioComponent,
} from './components';

export const UserRoutes: Routes = [
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'pesquisar', component: ListarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],

  exports: [RouterModule],
})
export class UserRoutingModule {}
