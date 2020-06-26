import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HistoricoAcessoDTO } from '../../models';
import { API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class HistoricoAcessoService {
  private readonly PATH: string = '/historicoacesso';

  constructor(private http: HttpClient) {}

  getAllHistoryAccess(): Observable<HistoricoAcessoDTO[]> {
    return this.http.get<HistoricoAcessoDTO[]>(API_CONFIG.baseUrl + this.PATH);
  }

  getAllHistoryAccessPagination(
    direction = 'ASC',
    linesPerPage = 10,
    orderBy = 'dataAcesso',
    page = 0,
  ): Observable<any> {
    return this.http.get(
      `${
        API_CONFIG.baseUrl + this.PATH
      }/page?direction=${direction}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&page=${page}`,
    );
  }
}
