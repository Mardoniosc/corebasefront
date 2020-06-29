import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  CadastrarComponent,
  ListarComponent,
  UsuarioComponent,
  PerfilUserComponent,
  AtualizarComponent,
} from './components';
import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [
    CadastrarComponent,
    ListarComponent,
    UsuarioComponent,
    PerfilUserComponent,
    AtualizarComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  providers: [MatDatepickerModule],
})
export class UserModule {}
