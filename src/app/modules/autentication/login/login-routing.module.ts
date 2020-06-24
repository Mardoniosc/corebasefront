import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import {
  LoginComponent,
  ForgotComponent,
  AutenticacaoComponent,
} from './components';

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: AutenticacaoComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'forgot', component: ForgotComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LoginRoutes)],

  exports: [RouterModule],
})
export class LoginRoutingModule {}
