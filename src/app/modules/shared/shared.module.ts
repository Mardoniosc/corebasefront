import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginService, StorangeService } from './services';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginService, StorangeService],
})
export class SharedModule {}
