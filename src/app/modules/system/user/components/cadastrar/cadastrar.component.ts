import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { PerfilService, UsuarioService } from 'src/app/modules/shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PerfilDTO, Erro, UsuarioNewDTO } from '../../../../shared/models';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  erro = {} as Erro;

  usuarioNew = {} as UsuarioNewDTO;

  form: FormGroup;

  perfil = {} as PerfilDTO;

  perfils: PerfilDTO[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
  ) {}

  startDate = new Date(2000, 1, 1);

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.carregaPerfils();
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      datanascimento: ['', Validators.required],
      email: ['', Validators.email],
      senha: ['', Validators.required],
      perfil: ['', Validators.required],
    });
  }

  carregaPerfils() {
    this.subscriptions.push(
      this.perfilService.getAll().subscribe(
        (data) => {
          this.perfils = data;
        },
        (err) => {
          this.erro = err.error;
          const msg = this.erro.message;
          const title = `Erro ${this.erro.status} ${this.erro.error}`;
          this.snackBar.open(msg, title, { duration: 3000 });
        },
      ),
    );
  }

  cadastrarUsuario() {
    if (this.form.invalid) {
      this.snackBar.open(
        'Preenchimento invalido do formulário de cadastro',
        'Erro no preencimento',
        { duration: 3000 },
      );
      return;
    }

    // carregando informações para salvar novo usuário
    this.usuarioNew = this.form.value;
    this.usuarioNew.perfilId = this.form.value.perfil;
    this.usuarioNew.dataNascimento = this.form.value.datanascimento;
    this.usuarioNew.criado = new Date();
    this.usuarioNew.login = this.usuarioNew.email;
    this.usuarioNew.status = 1;
    console.log(this.usuarioNew);
    this.subscriptions.push(
      this.usuarioService.insert(this.usuarioNew).subscribe(
        (data) => {
          this.snackBar.open('Cadastro realizado com sucesso!', 'Cadastro', {
            duration: 4000,
          });
          this.router.navigate(['/usuario/pesquisar']);
        },
        (err) => {
          this.erro = err.error;
          const msg = this.erro.message;
          const title = `Erro ${this.erro.status} ${this.erro.error}`;
          this.snackBar.open(msg, title, { duration: 3000 });
        },
      ),
    );
  }
}
