import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  LoginComponent,
  ForgotComponent,
  AutenticacaoComponent,
} from './components';

import { SharedModule } from '../../shared';

@NgModule({
  declarations: [LoginComponent, ForgotComponent, AutenticacaoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
