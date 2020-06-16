import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import {
  CadastrarComponent,
  ListarComponent,
  UsuarioComponent,
} from './components';
import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [CadastrarComponent, ListarComponent, UsuarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenuModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [MatDatepickerModule],
})
export class UserModule {}
