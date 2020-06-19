import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  PerfilDTO,
  PerfilService,
  ErroDTO,
  ErroGeral,
} from '../../../../shared';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO[];

  private subscriptions: Subscription[] = [];

  form: FormGroup;

  perfil = {} as PerfilDTO;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  cadastrarPerfil() {
    if (this.form.invalid) {
      return;
    }

    this.perfil = this.form.value;
    this.subscriptions.push(
      this.perfilService.insert(this.perfil).subscribe(
        (data) => {
          swal(`Perfil ${this.perfil.nome}`, {
            title: 'Cadastrado!',
            icon: 'success',
            buttons: [false],
            timer: 2000,
          });
          this.router.navigate(['/perfil/pesquisar']);
        },
        (err) => {
          this.erroGeral = err.error;
          this.erroDTO = this.erroGeral.errors;
          if (this.erroDTO.length > 0) {
            this.erroDTO.forEach((e) => {
              const title = `${this.erroGeral.status} - ${e.fieldName}`;
              this.snackBar.open(e.message, title, { duration: 3000 });
            });
          } else {
            const title = `${this.erroGeral.status} - ${this.erroGeral.error}`;
            this.snackBar.open('Erro', title, { duration: 3000 });
          }
        },
      ),
    );
  }
}
