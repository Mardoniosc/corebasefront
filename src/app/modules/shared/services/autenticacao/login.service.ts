import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../../environments/environment';

import { Login } from '../../models';

@Injectable()
export class LoginService {
  private readonly PATH: string = '/auth/login';

  constructor(private http: HttpClient) {}

  logar(login: Login): Observable<any> {
    return this.http.post(env.baseURL + this.PATH, login);
  }
}
