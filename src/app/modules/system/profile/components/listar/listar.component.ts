import { Component, OnInit } from '@angular/core';
import {
  Perfil,
  PerfilService,
  Permissoes,
  PermissaoService,
  PerfilPermissaoService,
  PerfilPermissaoDTO,
  ErroDTO,
  ErroGeral,
} from 'src/app/modules/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  perfils: Perfil[];

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  status: string;

  permissoes: Permissoes[];

  perfilPermi: PerfilPermissaoDTO;

  perfilPermissao: PerfilPermissaoDTO[];

  constructor(
    private perfilService: PerfilService,
    private snackBar: MatSnackBar,
    private toast: ToastrService,
    private permissaoService: PermissaoService,
    private perfilPermissaoService: PerfilPermissaoService,
  ) {}

  ngOnInit(): void {
    this.carregaPerfils();
    this.carregaPermissoes();
    this.carregaPerfilHasPermition();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregaPerfils(): void {
    this.subscriptions.push(
      this.perfilService.getAll().subscribe(
        (data) => {
          this.perfils = data;
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

  carregaPermissoes(): void {
    this.subscriptions.push(
      this.permissaoService.getAll().subscribe(
        (data) => {
          this.permissoes = data;
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

  carregaPerfilHasPermition(): void {
    this.subscriptions.push(
      this.perfilPermissaoService.getAll().subscribe(
        (data) => {
          this.perfilPermissao = data;
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

  verificaPermissao(perfil: number, permissao: number): boolean {
    const response = this.perfilPermissao?.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao,
    );
    if (response) {
      return true;
    }
    return false;
  }

  atualizaStatus(perfil: number, permissao: number) {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao,
    );

    if (!response) {
      this.snackBar.open('Erro ao tentar atualizar', 'Erro', {
        duration: 3000,
      });
      return;
    }
    this.perfilPermi = response;
    if (this.perfilPermi.status === 1) {
      this.status = 'desativar';
    } else {
      this.status = 'ativar';
    }

    Swal.fire({
      title: `Deseja ${this.status} permissao?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Sim, ${this.status}!`,
    }).then((result) => {
      if (result.value) {
        this.perfilPermi.status = this.status === 'ativar' ? 1 : 0;
        this.perfilPermissaoService.update(this.perfilPermi).subscribe(
          (data) => {
            Swal.fire({
              title: this.status === 'ativar' ? 'Ativado!' : 'Desativado',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000,
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

  pegaStatusAtual(perfil: number, permissao: number): string {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao,
    );
    if (!response) {
      return 'dafault';
    }
    return response.status === 1 ? 'primary' : 'dafault';
  }
}
