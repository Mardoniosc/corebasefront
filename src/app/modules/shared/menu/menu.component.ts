import { Component, OnInit } from '@angular/core';
import { Usuario, Permissoes } from '../models';
import { StorangeService } from '../services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario = {} as Usuario;

  permissoes: Permissoes[];

  // variaveis de Menu

  homeMenu = false;

  dashboardMenu = false;

  // usuario
  usuarioPrincipal = false;

  usuarioPesquisar = false;

  usuarioCadastrar = false;

  // Permissao
  permissaoPrincipal = false;

  permissaoPesquisar = false;

  permissaoCadastrar = false;

  // Perfil
  perfilPrincipal = false;

  perfilPesquisar = false;

  perfilCadastrar = false;

  constructor(private storange: StorangeService) {}

  ngOnInit(): void {
    this.usuario = this.storange.getLocalUser();
    this.permissoes = this.usuario.perfil.permissoes;
    this.carregaMenu();
  }

  carregaMenu() {
    this.permissoes.map((x) => {
      return this.habilitarOpcaoMenu(x.descricao);
    });
  }

  habilitarOpcaoMenu(descricao) {
    switch (descricao) {
      case 'Usuário':
        this.usuarioPrincipal = true;
        break;
      case 'Cadastrar Usuário':
        this.usuarioCadastrar = true;
        break;
      case 'Pesquisar Usuário':
        this.usuarioPesquisar = true;
        break;
      case 'Perfil':
        this.perfilPrincipal = true;
        break;
      case 'Cadastrar Perfil':
        this.perfilCadastrar = true;
        break;
      case 'Pesquisar Perfil':
        this.perfilPesquisar = true;
        break;
      case 'Permissão':
        this.permissaoPrincipal = true;
        break;
      case 'Cadastrar Permissão':
        this.permissaoCadastrar = true;
        break;
      case 'Pesquisar Permissão':
        this.permissaoPesquisar = true;
        break;
      default:
        break;
    }
  }
}
