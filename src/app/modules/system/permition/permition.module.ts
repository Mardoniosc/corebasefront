import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  ListarComponent,
  CadastrarComponent,
  PermissaoComponent,
} from './components';

import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [ListarComponent, CadastrarComponent, PermissaoComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenuModule,
    RouterModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
})
export class PermitionModule {}
