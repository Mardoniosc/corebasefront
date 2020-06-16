import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CadastrarComponent, ListarComponent } from './components';

export const UserRoutes: Routes = [
  { path: 'usuario/cadastrar', component: CadastrarComponent },
  { path: 'usuario/pesquisar', component: ListarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],

  exports: [RouterModule],
})
export class UserRoutingModule {}
