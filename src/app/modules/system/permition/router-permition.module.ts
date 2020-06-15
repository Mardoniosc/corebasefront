import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CadastrarComponent, ListarComponent } from './components';

export const PermitionRoutes: Routes = [
  { path: 'permissao-cadastrar', component: CadastrarComponent },
  { path: 'permissao-pesquisar', component: ListarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(PermitionRoutes)],

  exports: [RouterModule],
})
export class PermitionRoutingModule {}
