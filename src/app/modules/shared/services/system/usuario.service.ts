import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioListAllDTO, UsuarioNewDTO, Usuario } from '../../models';
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

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${API_CONFIG.baseUrl + this.PATH}/${id}`);
  }

  getUserByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${API_CONFIG.baseUrl + this.PATH}/email?email=${email}`,
    );
  }

  insert(usuario: UsuarioNewDTO): Observable<any> {
    return this.http.post(API_CONFIG.baseUrl + this.PATH, usuario);
  }

  updateUser(usuario: UsuarioListAllDTO): Observable<any> {
    return this.http.put(
      `${API_CONFIG.baseUrl + this.PATH}/${usuario.id}`,
      usuario,
    );
  }

  updateImage(file: FormData, id: number): Observable<any> {
    return this.http.post(
      `${API_CONFIG.baseUrl + this.PATH}/picture/${id}`,
      file,
    );
  }

  updateStatus(usuario: UsuarioListAllDTO): Observable<any> {
    return this.http.patch(
      `${API_CONFIG.baseUrl + this.PATH}/status/${usuario.id}`,
      usuario,
    );
  }

  updateSenha(usuario: UsuarioListAllDTO): Observable<any> {
    return this.http.patch(
      `${API_CONFIG.baseUrl + this.PATH}/senha/${usuario.id}`,
      usuario,
    );
  }

  update(usuario: UsuarioListAllDTO): Observable<any> {
    return this.http.put(
      `${API_CONFIG.baseUrl + this.PATH}/${usuario.id}`,
      usuario,
    );
  }
}
