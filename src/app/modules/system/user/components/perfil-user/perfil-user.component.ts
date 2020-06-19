import { Component, OnInit } from '@angular/core';

import { API_CONFIG } from 'src/app/modules/shared/config';
import { Usuario, StorangeService } from '../../../../shared';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent implements OnInit {
  usuario = {} as Usuario;

  baseUrlServidor = API_CONFIG.baseUrl;

  constructor(private storangeService: StorangeService) {}

  ngOnInit(): void {
    this.carregaDadosUsuario();
  }

  carregaDadosUsuario() {
    this.usuario = this.storangeService.getLocalUser();
  }
}
