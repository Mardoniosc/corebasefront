import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PerfilPermissaoDTO } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class PerfilPermissaoService {
  private readonly PATH: string = '/perfilpermissao';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PerfilPermissaoDTO[]> {
    return this.http.get<PerfilPermissaoDTO[]>(API_CONFIG.baseUrl + this.PATH);
  }

  getId(perfilID: number, permissaoId: number): Observable<PerfilPermissaoDTO> {
    return this.http.get<PerfilPermissaoDTO>(
      `${API_CONFIG.baseUrl + this.PATH}/${perfilID}/${permissaoId}`,
    );
  }

  update(perfilPermissao: PerfilPermissaoDTO): Observable<any> {
    return this.http.put(
      `${API_CONFIG.baseUrl + this.PATH}/${perfilPermissao.perfilId}/${
        perfilPermissao.permissaoId
      }`,
      perfilPermissao,
    );
  }
}
