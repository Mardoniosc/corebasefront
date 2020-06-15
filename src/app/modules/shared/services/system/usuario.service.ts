import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioListAllDTO } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly PATH: string = '/usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UsuarioListAllDTO[]> {
    return this.http.get<UsuarioListAllDTO[]>(API_CONFIG.baseUrl + this.PATH);
  }
}
