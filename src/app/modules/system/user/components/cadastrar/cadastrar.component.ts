import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { PerfilService, UsuarioService } from 'src/app/modules/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import {
  PerfilDTO,
  ErroGeral,
  ErroDTO,
  UsuarioNewDTO,
} from '../../../../shared/models';

import { CpfValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  erroGeral = {} as ErroGeral;

  erroDTO = {} as ErroDTO;

  usuarioNew = {} as UsuarioNewDTO;

  form: FormGroup;

  perfil = {} as PerfilDTO;

  perfils: PerfilDTO[];

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
  ) {}

  startDate = new Date(2000, 1, 1);

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.carregaPerfils();
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, CpfValidator]],
      datanascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      perfil: ['', Validators.required],
    });
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

  cadastrarUsuario(): void {
    if (this.form.invalid) {
      this.toast.error('Formulário com campos invalidos!', 'Erro!', {
        timeOut: 4000,
      });
      this.toucheCamposFormulario();
      return;
    }

    // carregando informações para salvar novo usuário
    this.usuarioNew = this.form.value;
    this.usuarioNew.perfilId = this.form.value.perfil;
    this.usuarioNew.dataNascimento = this.form.value.datanascimento;
    this.usuarioNew.criado = new Date();
    this.usuarioNew.login = this.usuarioNew.email;
    this.usuarioNew.status = 1;
    this.subscriptions.push(
      this.usuarioService.insert(this.usuarioNew).subscribe(
        (data) => {
          const msg = 'Usuário cadastradas com sucesso!';

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

  toucheCamposFormulario(): void {
    this.form.get('cpf').markAsTouched();
    this.form.get('email').markAsTouched();
    this.form.get('nome').markAsTouched();
    this.form.get('senha').markAsTouched();
    this.form.get('perfil').markAsTouched();
    this.form.get('datanascimento').markAsTouched();
  }

  refresh(): void {
    window.location.reload();
  }
}
