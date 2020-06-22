import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  cadastrarPerfil(): void {
    if (this.form.invalid) {
      this.snackBar.open('Formulário com campos invalidos!', 'Erro!', {
        duration: 3000,
      });
      this.toucheCamposFormulario();
      return;
    }

    this.perfil = this.form.value;
    this.subscriptions.push(
      this.perfilService.insert(this.perfil).subscribe(
        (data) => {
          Swal.fire({
            title: 'Cadastrado!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.refresh();
          }, 1900);
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

  toucheCamposFormulario(): void {
    this.form.get('nome').markAsTouched();
  }

  refresh(): void {
    window.location.reload();
  }
}
