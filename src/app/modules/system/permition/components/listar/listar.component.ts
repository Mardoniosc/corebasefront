import { Component, OnInit } from '@angular/core';
import {
  Permissoes,
  PermissaoService,
  ErroDTO,
  ErroGeral,
  Perfil,
  PerfilPermissaoDTO,
  PerfilService,
  PerfilPermissaoService,
  StorangeService,
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
    private storangeService: StorangeService,
  ) {}

  ngOnInit(): void {
    this.carregaPerfils();
    this.carregaPermissoes();
    this.carregaPerfilHasPermition();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregaPerfils(): void {
    this.subscriptions.push(
      this.perfilService.getAll().subscribe(
        (data) => {
          this.perfils = data;
          this.storangeService.setLocalPerfils(this.perfils);
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
          this.storangeService.setLocalPermition(this.permissoes);
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
          this.storangeService.setLocalPP(this.perfilPermissao);
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

  verificaPermissaoHasPerfil(permissao: number, perfil: number): boolean {
    return false;
  }

  permissaDescricao(id: number): string {
    const permissao = this.permissoes.find((x) => x.id === id);
    return permissao.descricao;
  }

  permissaoUrl(id: number): string {
    const permissao = this.permissoes.find((x) => x.id === id);
    return permissao.url;
  }

  perfiNome(id: number): string {
    const perfil = this.perfils.find((x) => x.id === id);
    return perfil.nome;
  }

  alterStatusPP(pp: PerfilPermissaoDTO): void {
    this.perfilPermi = pp;

    this.status = pp.status === 1 ? 'desativar' : 'ativar';

    Swal.fire({
      title: `Deseja ${this.status} permissao?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Sim, ${this.status}!`,
    }).then((result) => {
      if (result.value) {
        this.perfilPermi.status = pp.status === 1 ? 0 : 1;
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
}
