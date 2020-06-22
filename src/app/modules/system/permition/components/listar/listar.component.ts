import { Component, OnInit } from '@angular/core';
import {
  Permissoes,
  PermissaoService,
  ErroDTO,
  ErroGeral,
} from 'src/app/modules/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  permissoes: Permissoes[];

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  private subscriptions: Subscription[] = [];

  constructor(
    private permissaoService: PermissaoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.carregaPermissoes();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregaPermissoes() {
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
}
