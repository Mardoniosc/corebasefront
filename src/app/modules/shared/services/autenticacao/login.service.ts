import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable()
export class LoginService {
  private readonly PATH: string = '/auth/login';

  constructor(private http: HttpClient) {}

  logar(login: Login): Observable<any> {
    return this.http.post(API_CONFIG.baseUrl + this.PATH, login);
  }
}
