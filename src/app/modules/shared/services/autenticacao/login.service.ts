import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login, Usuario, Forgot, InfoUserLogged } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable()
export class LoginService {
  private readonly PATH: string = '/auth';

  constructor(private http: HttpClient) {}

  logar(login: Login): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${API_CONFIG.baseUrl + this.PATH}/login`,
      login,
      {
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
    );
  }

  forgot(email: Forgot): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl + this.PATH}/forgot`, email);
  }

  pegaIpUser(): Observable<InfoUserLogged> {
    return this.http.get<InfoUserLogged>(API_CONFIG.pegaIp);
  }
}
