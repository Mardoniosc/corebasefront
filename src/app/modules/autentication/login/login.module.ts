import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent, LogarComponent } from './components';

@NgModule({
  declarations: [LoginComponent, LogarComponent],
  imports: [CommonModule, RouterModule],
})
export class LoginModule {}
