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
    this.carregaUser();
    this.permissoes = this.usuario.perfil.permissoes;
    console.log(this.permissoes);
  }

  carregaUser() {
    this.usuario = this.storange.getLocalUser();
  }
}
