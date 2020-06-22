import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  ListarComponent,
  CadastrarComponent,
  PermissaoComponent,
  CreateNewComponent,
} from './components';

import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [
    ListarComponent,
    CadastrarComponent,
    PermissaoComponent,
    CreateNewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuModule,
    RouterModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class PermitionModule {}
