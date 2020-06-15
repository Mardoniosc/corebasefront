import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CadastrarComponent, ListarComponent } from './components';

export const ProfileRoutes: Routes = [
  { path: 'perfil-cadastrar', component: CadastrarComponent },
  { path: 'perfil-pesquisar', component: ListarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ProfileRoutes)],

  exports: [RouterModule],
})
export class ProfileRoutingModule {}
