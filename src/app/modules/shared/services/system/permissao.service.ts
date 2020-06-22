import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Permissoes, PermissaoDTO } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  private readonly PATH: string = '/permissoes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Permissoes[]> {
    return this.http.get<Permissoes[]>(API_CONFIG.baseUrl + this.PATH);
  }

  insert(permissao: PermissaoDTO): Observable<any> {
    return this.http.post(API_CONFIG.baseUrl + this.PATH, permissao);
  }
}
