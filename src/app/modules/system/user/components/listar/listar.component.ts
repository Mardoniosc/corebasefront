import { Component, OnInit } from '@angular/core';
import {
  UsuarioListAllDTO,
  UsuarioService,
  Usuario,
  ErroDTO,
  ErroGeral,
} from 'src/app/modules/shared';
import { Subscription } from 'rxjs';
import { API_CONFIG } from 'src/app/modules/shared/config';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  usuarios: UsuarioListAllDTO[];

  usuariosFiltrados: UsuarioListAllDTO[];

  usuario = {} as UsuarioListAllDTO;

  userDetalhes = {} as Usuario;

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  baseUrlServidor = API_CONFIG.baseUrl;

  constructor(
    private toast: ToastrService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregarUsuarios(): void {
    this.subscriptions.push(
      this.usuarioService.getAll().subscribe(
        (data) => {
          this.usuarios = data;
          this.usuariosFiltrados = data;
        },
        (err) => {
          this.erroGeral = err.error;

          if (this.erroGeral.errors) {
            this.erroGeral.errors.forEach((e) => {
              this.erroDTO = e;
              this.toast.error(
                `Erro ${this.erroGeral.status} ${e.message}`,
                e.fieldName,
                { timeOut: 4000 },
              );
            });
          } else {
            const title = `Erro ${this.erroGeral.status}`;
            this.toast.error(this.erroGeral.message, title, {
              timeOut: 3000,
            });
          }
        },
      ),
    );
  }

  ativarDesativarUsuario(usuario: UsuarioListAllDTO): void {
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
                this.toast.error(
                  `Erro ${this.erroGeral.status} ${e.message}`,
                  e.fieldName,
                  { timeOut: 4000 },
                );
              });
            } else {
              const title = `Erro ${this.erroGeral.status}`;
              this.toast.error(this.erroGeral.message, title, {
                timeOut: 3000,
              });
            }
          },
        );
      }
    });
  }

  filtraUsuarioPeloNome(nome: string): void {
    if (!nome) {
      this.usuariosFiltrados = this.usuarios;
    } else {
      this.usuariosFiltrados = this.usuarios.filter((x) =>
        x.nome.trim().toLowerCase().includes(nome.trim().toLowerCase()),
      );
    }
  }

  carregaUser(id: number): void {
    this.usuarioService.getUserById(id).subscribe((data) => {
      this.userDetalhes = data;
    });
  }
}
