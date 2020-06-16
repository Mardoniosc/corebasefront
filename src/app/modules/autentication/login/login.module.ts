import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
})
export class LoginModule {}
