import { Component, OnInit } from '@angular/core';
import {
  Perfil,
  PerfilPermissaoDTO,
  Permissoes,
  PerfilPermissaoService,
  PerfilService,
  PermissaoService,
  StorangeService,
  ErroDTO,
  ErroGeral,
} from 'src/app/modules/shared';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  perfilPermissoes: PerfilPermissaoDTO[];

  perfilHasPermissao = {} as PerfilPermissaoDTO;

  perfils: Perfil[];

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  perfil = {} as Perfil;

  idPerfilSelecionado = null;

  perfilSelecionadoTrue = false;

  permissao = {} as Permissoes;

  permissoes: Permissoes[];

  checkBoxSelecionadosArray = [] as Array<Int32Array>;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private perfilPermissaoService: PerfilPermissaoService,
    private perfilService: PerfilService,
    private permissaoService: PermissaoService,
    private storangeService: StorangeService,
  ) {}

  ngOnInit(): void {
    this.reloadPermissoesPerfil();
  }

  reloadPermissoesPerfil(): void {
    this.listarTodosPerfils();
    this.listarTodasPermissoes();
    this.listarTodasPerfilHasPermissao();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.storangeService.setLocalPP(null);
    this.storangeService.setLocalPerfils(null);
    this.storangeService.setLocalPermition(null);
  }

  checkBoxSelecionado(id): void {
    if (this.checkBoxSelecionadosArray.indexOf(id) > -1) {
      this.checkBoxSelecionadosArray.splice(
        this.checkBoxSelecionadosArray.indexOf(id),
        1,
      );
    } else {
      this.checkBoxSelecionadosArray.push(id);
    }
  }

  listarTodosPerfils(): void {
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

  listarTodasPermissoes(): void {
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

  listarTodasPerfilHasPermissao(): void {
    this.subscriptions.push(
      this.perfilPermissaoService.getAll().subscribe(
        (data) => {
          this.perfilPermissoes = data;
          this.storangeService.setLocalPP(this.perfilPermissoes);
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

  pegarPerfil(id: number): void {
    this.perfil = this.perfils.find((x) => x.id === id);
    if (!this.perfil) {
      this.perfils = JSON.parse(localStorage.getItem('allPerfils'));
      this.perfil = this.perfils.find((x) => x.id === id);
    }
  }

  pergarPermissao(id): void {
    this.permissao = this.permissoes.find((x) => x.id === id);
    if (!this.permissao) {
      this.permissoes = JSON.parse(localStorage.getItem('allPermissao'));
      this.permissao = this.permissoes.find((x) => x.id === id);
    }
  }

  cadastrarPerfilHasPermissao(perfilPermissao: PerfilPermissaoDTO): void {
    this.subscriptions.push(
      this.perfilPermissaoService.insert(perfilPermissao).subscribe(
        (data) => console.log(),
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

  perfilSelecionado(id): void {
    this.idPerfilSelecionado = id;
    this.perfilSelecionadoTrue = true;
    this.verificaPermissaoDisponivelParaOPerfil(id);
  }

  verificaPermissaoDisponivelParaOPerfil(id) {
    this.permissoes = this.storangeService.getLocalPermition();

    this.permissoes = this.permissoes.filter((permissao) => {
      const resultado = this.perfilPermissoes.find(
        (perfilPermissao) =>
          perfilPermissao.permissaoId === permissao.id &&
          perfilPermissao.perfilId === id,
      );
      if (!resultado) {
        return permissao;
      }

      return null;
    });
  }

  cadastrar(): void {
    if (this.perfilSelecionadoTrue === false) {
      const msg = 'Nenhum Perfil selecionado para cadastro';
      this.snackBar.open(msg, 'Info', { duration: 5000 });
      return;
    }
    if (this.checkBoxSelecionadosArray.length < 1) {
      const msg = 'Nenhuma permissão selecionada para cadastro';
      this.snackBar.open(msg, 'Info', { duration: 5000 });
      return;
    }

    this.pegarPerfil(this.idPerfilSelecionado);
    this.checkBoxSelecionadosArray.forEach((p) => {
      this.pergarPermissao(p);
      this.perfilHasPermissao.perfilId = this.perfil.id;
      this.perfilHasPermissao.permissaoId = this.permissao.id;
      this.perfilHasPermissao.status = 1;
      this.cadastrarPerfilHasPermissao(this.perfilHasPermissao);
    });
    const msg = 'Permissões cadastradas com sucesso!';
    Swal.fire({
      title: msg,
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      this.refresh();
    }, 1900);
  }

  refresh(): void {
    window.location.reload();
  }
}
