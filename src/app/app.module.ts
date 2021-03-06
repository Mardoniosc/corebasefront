import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {
  LoginModule,
  LoginRoutingModule,
  DashboardModule,
  DashboardRoutingModule,
  MenuModule,
  SharedModule,
  UserModule,
  UserRoutingModule,
  ProfileModule,
  ProfileRoutingModule,
  PermitionModule,
  PermitionRoutingModule,
  LogModule,
  LogRoutingModule,
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
    MenuModule,
    SharedModule,
    HttpClientModule,
    UserModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    ProfileModule,
    ProfileRoutingModule,
    PermitionModule,
    PermitionRoutingModule,
    LogModule,
    LogRoutingModule,
    ToastrModule.forRoot(),

    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
