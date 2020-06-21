import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Login,
  LoginService,
  ErroGeral,
  ErroDTO,
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

  erroDTO: ErroDTO[];

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
          console.log(err);
          this.erroGeral = err.error;
          const title = `Erro ${this.erroGeral.status}`;
          this.snackBar.open(this.erroGeral.message, title, { duration: 3000 });
        },
      ),
    );
  }
}
