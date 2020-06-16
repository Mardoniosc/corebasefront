import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PerfilDTO, Perfil } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private readonly PATH: string = '/perfils';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PerfilDTO[]> {
    return this.http.get<PerfilDTO[]>(API_CONFIG.baseUrl + this.PATH);
  }

  getId(perfilID: number): Observable<Perfil> {
    return this.http.get<Perfil>(
      `${API_CONFIG.baseUrl + this.PATH}/${perfilID}`,
    );
  }
}
