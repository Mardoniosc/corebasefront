import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent, CadastrarComponent } from './components';

import { SharedModule, MenuModule } from '../../shared';

@NgModule({
  declarations: [ListarComponent, CadastrarComponent],
  imports: [CommonModule, SharedModule, MenuModule],
})
export class ProfileModule {}
