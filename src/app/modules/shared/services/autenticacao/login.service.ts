import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login, Usuario } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable()
export class LoginService {
  private readonly PATH: string = '/auth/login';

  constructor(private http: HttpClient) {}

  logar(login: Login): Observable<Usuario> {
    return this.http.post<Usuario>(API_CONFIG.baseUrl + this.PATH, login);
  }
}
