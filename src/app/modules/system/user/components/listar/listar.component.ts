import { Component, OnInit } from '@angular/core';
import {
  UsuarioListAllDTO,
  UsuarioService,
  Usuario,
  ErroDTO,
  ErroGeral,
} from 'src/app/modules/shared';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  baseUrlServidor = API_CONFIG.baseUrl;

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
  ) {}

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
        (err) => {
          this.erroGeral = err.error;

          if (this.erroGeral.errors) {
            this.erroGeral.errors.forEach((e) => {
              this.erroDTO = e;
              this.snackBar.open(
                `Erro ${this.erroGeral.status} ${e.message}`,
                e.fieldName,
                { duration: 3000 },
              );
            });
          } else {
            const title = `Erro ${this.erroGeral.status}`;
            this.snackBar.open(this.erroGeral.message, title, {
              duration: 3000,
            });
          }
        },
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
          (err) => {
            this.erroGeral = err.error;

            if (this.erroGeral.errors) {
              this.erroGeral.errors.forEach((e) => {
                this.erroDTO = e;
                this.snackBar.open(
                  `Erro ${this.erroGeral.status} ${e.message}`,
                  e.fieldName,
                  { duration: 3000 },
                );
              });
            } else {
              const title = `Erro ${this.erroGeral.status}`;
              this.snackBar.open(this.erroGeral.message, title, {
                duration: 3000,
              });
            }
          },
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
