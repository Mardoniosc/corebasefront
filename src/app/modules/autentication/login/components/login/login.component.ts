import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login, LoginService, Erro } from 'src/app/modules/shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  login = {} as Login;

  erro = {} as Erro;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.criarForm();
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
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.erro = err.error;
          const msg = this.erro.message;
          const title = `Erro ${this.erro.status} ${this.erro.error}`;
          this.snackBar.open(msg, title, { duration: 3000 });
        },
      ),
    );
    //
  }
}
