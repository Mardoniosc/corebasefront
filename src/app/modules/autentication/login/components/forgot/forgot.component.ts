import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Forgot,
  ErroDTO,
  ErroGeral,
  LoginService,
} from 'src/app/modules/shared';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;

  private subscriptions: Subscription[] = [];

  forgot = {} as Forgot;

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO[];

  carregando = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  criarForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  enviarEmail() {
    this.carregando = true;
    if (this.form.invalid) {
      this.snackBar.open('E-mail inválido', 'Erro no preenchimento', {
        duration: 3000,
      });
      this.carregando = false;
      return;
    }

    this.forgot = this.form.value;

    this.subscriptions.push(
      this.loginService.forgot(this.forgot).subscribe(
        (data) => {
          this.carregando = false;
          swal(
            'Gerado nova senha com sucesso!',
            'Favor verificar seu e-mail',
            'success',
          );
          this.router.navigate(['/login']);
        },
        (err) => {
          this.carregando = false;
          this.erroGeral = err.error;
          const title = `Erro ${this.erroGeral.status}`;
          this.snackBar.open(this.erroGeral.message, title, { duration: 3000 });
        },
      ),
    );
  }
}
