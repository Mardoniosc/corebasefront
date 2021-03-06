import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ListarComponent,
  CadastrarComponent,
  PerfilComponent,
  AtualizarComponent,
} from './components';

import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [
    ListarComponent,
    CadastrarComponent,
    PerfilComponent,
    AtualizarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProfileModule {}
