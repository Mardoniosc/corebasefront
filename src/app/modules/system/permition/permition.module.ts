import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  ListarComponent,
  CadastrarComponent,
  PermissaoComponent,
} from './components';

import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [ListarComponent, CadastrarComponent, PermissaoComponent],
  imports: [CommonModule, SharedModule, MenuModule, RouterModule],
})
export class PermitionModule {}
