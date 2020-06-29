import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { PerfilService, UsuarioService } from 'src/app/modules/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {
  PerfilDTO,
  ErroGeral,
  ErroDTO,
  UsuarioListAllDTO,
  Usuario,
} from '../../../../shared/models';

import { CpfValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css'],
})
export class AtualizarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  erroGeral = {} as ErroGeral;

  erroDTO = {} as ErroDTO;

  usuarioNew = {} as UsuarioListAllDTO;

  usuario = {} as Usuario;

  form: FormGroup;

  perfil = {} as PerfilDTO;

  perfils: PerfilDTO[];

  userId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
  ) {}

  startDate = new Date(2000, 1, 1);

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.criarForm();
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.carregaPerfils();
    this.buscarUserId();
  }

  criarForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, CpfValidator]],
      datanascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      perfil: ['', Validators.required],
    });
  }

  buscarUserId(): void {
    this.subscriptions.push(
      this.usuarioService.getUserById(Number(this.userId)).subscribe(
        (data) => {
          this.usuario = data;
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

  atualizarUsuario(): void {
    if (this.form.invalid) {
      this.snackBar.open('Formulário com campos invalidos!', 'Erro!', {
        duration: 3000,
      });
      this.toucheCamposFormulario();
      return;
    }

    // carregando informações para salvar novo usuário
    this.usuario = this.form.value;
    this.usuarioNew.nome = this.usuario.nome;
    this.usuarioNew.cpf = this.usuario.cpf;
    this.usuarioNew.id = Number(this.userId);
    this.usuarioNew.perfilId = this.form.value.perfil;
    this.usuarioNew.dataNascimento = this.form.value.datanascimento;
    this.usuarioNew.email = this.usuario.email;
    this.usuarioNew.login = this.usuarioNew.email;
    this.usuarioNew.status = 1;
    this.subscriptions.push(
      this.usuarioService.update(this.usuarioNew).subscribe(
        (data) => {
          const msg = 'Usuário atualizado com sucesso!';

          Swal.fire({
            title: msg,
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

  toucheCamposFormulario(): void {
    this.form.get('cpf').markAsTouched();
    this.form.get('email').markAsTouched();
    this.form.get('nome').markAsTouched();
    this.form.get('perfil').markAsTouched();
    this.form.get('datanascimento').markAsTouched();
  }

  refresh(): void {
    window.location.reload();
  }
}
