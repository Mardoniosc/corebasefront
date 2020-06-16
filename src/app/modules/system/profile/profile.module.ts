import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  ListarComponent,
  CadastrarComponent,
  PerfilComponent,
} from './components';

import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [ListarComponent, CadastrarComponent, PerfilComponent],
  imports: [CommonModule, SharedModule, MenuModule, RouterModule],
})
export class ProfileModule {}
