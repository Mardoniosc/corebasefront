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

  constructor(private storange: StorangeService) {}

  ngOnInit(): void {
    this.usuario = this.storange.getLocalUser();
    this.permissoes = this.usuario.perfil.permissoes;
  }

  retornaicone(descricao): string {
    switch (descricao) {
      case 'Usuário':
        return 'user';
      case 'Perfil':
        return 'users';
      case 'Permissão':
        return 'lock';
      case 'Dashboard':
        return 'dashboard';
      case 'Home':
        return 'home';
      default:
        return 'drupal';
    }
  }
}
