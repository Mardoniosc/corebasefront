import { Component, OnInit } from '@angular/core';
import {
  UsuarioListAllDTO,
  UsuarioService,
  Usuario,
} from 'src/app/modules/shared';
import { Subscription } from 'rxjs';
import { API_CONFIG } from 'src/app/modules/shared/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  usuarios: UsuarioListAllDTO[];

  usuario = {} as UsuarioListAllDTO;

  userDetalhes = {} as Usuario;

  baseUrlServidor = API_CONFIG.baseUrl;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregarUsuarios() {
    this.subscriptions.push(
      this.usuarioService.getAll().subscribe(
        (data) => {
          this.usuarios = data;
        },
        (err) => console.log(err),
      ),
    );
  }

  ativarDesativarUsuario(usuario: UsuarioListAllDTO) {
    const status = usuario.status === 1 ? 'desativar' : 'ativar';
    this.usuario = usuario;
    Swal.fire({
      title: `Deseja ${status} usuario: ${usuario.nome}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Sim, confirmar!`,
    }).then((result) => {
      if (result.value) {
        this.usuario.status = status === 'ativar' ? 1 : 0;
        this.usuarioService.updateStatus(this.usuario).subscribe(
          (data) => {
            this.carregarUsuarios();
            Swal.fire({
              title: status === 'ativar' ? 'Ativado!' : 'Desativado',
              text: `Usuário ${usuario.nome} ${status} com sucesso!`,
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
          },
          (err) => console.log(err),
        );
      }
    });
  }

  carregaUser(id: number): void {
    this.usuarioService.getUserById(id).subscribe((data) => {
      this.userDetalhes = data;
    });
  }
}
