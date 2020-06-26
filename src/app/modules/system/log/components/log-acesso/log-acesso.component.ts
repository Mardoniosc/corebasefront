import { Component, OnInit } from '@angular/core';
import {
  HistoricoAcessoDTO,
  HistoricoAcessoService,
  UsuarioService,
  StorangeService,
  UsuarioListAllDTO,
  PerfilService,
  Perfil,
  Pagination,
} from 'src/app/modules/shared';
import { API_CONFIG } from 'src/app/modules/shared/config';

@Component({
  selector: 'app-log-acesso',
  templateUrl: './log-acesso.component.html',
  styleUrls: ['./log-acesso.component.css'],
})
export class LogAcessoComponent implements OnInit {
  baseUrlServidor = API_CONFIG.baseUrl;

  historicoAcessoDTO: HistoricoAcessoDTO[];

  usuarios: UsuarioListAllDTO[];

  usuario = {} as UsuarioListAllDTO;

  paginacao = {} as Pagination;

  numerosDePaginas = [];

  perfils: Perfil[];

  constructor(
    private historicoAcessoService: HistoricoAcessoService,
    private userService: UsuarioService,
    private storangeService: StorangeService,
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    this.carregaHistoricoUsuario();
    this.carregaPerfils();
    this.carregaUsers();
  }

  carregaHistoricoUsuario(): void {
    this.historicoAcessoService
      .getAllHistoryAccessPagination('ASC', 10, 'dataAcesso', 0)
      .subscribe(
        (data) => {
          this.historicoAcessoDTO = data.content;
          this.paginacao = data;
          this.carregaPaginas();
        },
        (err) => console.log(err),
      );
  }

  mudarPagina(page: number): void {
    this.historicoAcessoService
      .getAllHistoryAccessPagination('ASC', 10, 'dataAcesso', page)
      .subscribe((data) => {
        this.historicoAcessoDTO = data.content;
        this.paginacao = data;
      });
  }

  carregaPaginas(): void {
    this.numerosDePaginas = Array(this.paginacao.totalPages)
      .fill(this.paginacao.totalPages, 0, this.paginacao.totalPages)
      .map((x, i) => i);
  }

  carregaUsers(): void {
    this.userService.getAll().subscribe((data) => {
      this.storangeService.setLocalAllUsers(data);
      this.usuarios = this.storangeService.getLocalAllUsers();
    });
  }

  carregaPerfils(): void {
    this.perfilService.getAll().subscribe(
      (data) => {
        this.storangeService.setLocalPerfils(data);
      },
      (err) => console.log(err),
    );
  }

  filtraInfoUser(infoDesejada: string, id: number): string | false {
    this.usuarios = this.storangeService.getLocalAllUsers();

    if (!this.usuarios) {
      return false;
    }

    this.usuario = this.usuarios.find((user) => user.id === id);
    if (this.usuario) {
      switch (infoDesejada) {
        case 'usuario':
          return this.usuario.nome;
        case 'email':
          return this.usuario.email;
        case 'perfil':
          return 'Master';
        case 'status':
          return this.usuario.status.toString();
        case 'img':
          return this.usuario.imagem;
        default:
          return false;
      }
    }
    return false;
  }
}
