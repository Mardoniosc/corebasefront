import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent, CadastrarComponent } from './components';

@NgModule({
  declarations: [ListarComponent, CadastrarComponent],
  imports: [CommonModule],
})
export class ProfileModule {}
