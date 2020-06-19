import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  CadastrarComponent,
  ListarComponent,
  UsuarioComponent,
  PerfilUserComponent,
} from './components';

export const UserRoutes: Routes = [
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      { path: 'cadastrar', component: CadastrarComponent },
      { path: 'pesquisar', component: ListarComponent },
      { path: 'perfil', component: PerfilUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],

  exports: [RouterModule],
})
export class UserRoutingModule {}
