import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import {
  LoginModule,
  LoginRoutingModule,
  DashboardModule,
  DashboardRoutingModule,
} from './modules';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LoginModule,
    LoginRoutingModule,
    RouterModule,
    DashboardModule,
    DashboardRoutingModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
