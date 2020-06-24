import { Component, OnInit } from '@angular/core';
import {
  HistoricoAcessoDTO,
  HistoricoAcessoService,
  UsuarioService,
  StorangeService,
  UsuarioListAllDTO,
  PerfilService,
  Perfil,
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
  }

  carregaHistoricoUsuario() {
    this.historicoAcessoService.getAllHistoryAccessPagination().subscribe(
      (data) => {
        this.historicoAcessoDTO = data.content;
      },
      (err) => console.log(err),
    );
  }

  carregaUsers(): void {
    this.userService.getAll().subscribe((data) => {
      this.storangeService.setLocalAllUsers(data);
      this.usuarios = this.storangeService.getLocalAllUsers();
    });
  }

  carregaPerfils() {
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
      this.carregaUsers();
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
