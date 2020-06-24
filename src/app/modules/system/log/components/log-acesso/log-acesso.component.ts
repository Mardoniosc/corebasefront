import { Component, OnInit } from '@angular/core';
import {
  Usuario,
  HistoricoAcesso,
  UsuarioService,
} from 'src/app/modules/shared';

@Component({
  selector: 'app-log-acesso',
  templateUrl: './log-acesso.component.html',
  styleUrls: ['./log-acesso.component.css'],
})
export class LogAcessoComponent implements OnInit {
  usuarios: Usuario[] = [];

  acessos: HistoricoAcesso[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregaUsuarios();
  }

  carregaUsuarios(): void {
    this.usuarioService.getAll().subscribe((data) => {
      data.forEach((user) => {
        this.usuarioService.getUserById(user.id).subscribe((newUser) => {
          this.usuarios.push(newUser);
          this.carregaHistoricoDeAcesso(newUser);
        });
      });
    });
  }

  carregaHistoricoDeAcesso(user: Usuario): void {
    user.historicosAcesso.forEach((h) => {
      this.acessos.push(h);
    });
  }
}
