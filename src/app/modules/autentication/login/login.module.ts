import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, LogarComponent } from './components';

import { SharedModule } from '../../shared';

@NgModule({
  declarations: [LoginComponent, LogarComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
})
export class LoginModule {}
