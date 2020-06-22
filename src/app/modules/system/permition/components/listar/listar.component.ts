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
} from 'src/app/modules/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

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
    private permissaoService: PermissaoService,
    private perfilPermissaoService: PerfilPermissaoService,
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
}
