import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CadastrarComponent, ListarComponent } from './components';
import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [CadastrarComponent, ListarComponent],
  imports: [CommonModule, SharedModule, MenuModule, RouterModule],
})
export class UserModule {}
