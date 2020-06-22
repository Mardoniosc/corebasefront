import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Login,
  LoginService,
  ErroGeral,
  ErroDTO,
  UserLoggedService,
} from 'src/app/modules/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  login = {} as Login;

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private userLoggedService: UserLoggedService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.criarForm();
    this.verificaUserLogged();
  }

  verificaUserLogged() {
    const logado = this.userLoggedService.userLogged();

    if (logado) {
      this.router.navigate(['/dashboard']);
    }
    console.log('Usuário não logado');
  }

  criarForm(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logar(): void {
    if (this.form.invalid) {
      this.snackBar.open(
        'Preechimento inválido do formularios de login',
        'Erro ao ler dados',
        { duration: 3000 },
      );
      return;
    }
    this.login = this.form.value;
    this.subscriptions.push(
      this.loginService.logar(this.login).subscribe(
        (data) => {
          localStorage.setItem('@corebase:user', JSON.stringify(data));
          this.refresh();
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

  refresh(): void {
    window.location.reload();
  }
}
