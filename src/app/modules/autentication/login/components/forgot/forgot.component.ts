import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Forgot, Erro, LoginService } from 'src/app/modules/shared';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;

  private subscriptions: Subscription[] = [];

  forgot = {} as Forgot;

  erro = {} as Erro;

  constructor(
    private fb: FormBuilder,
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
    if (this.form.invalid) {
      this.snackBar.open('E-mail inválido', 'Erro no preenchimento', {
        duration: 3000,
      });

      return;
    }

    this.forgot = this.form.value;

    this.subscriptions.push(
      this.loginService.forgot(this.forgot).subscribe(
        (data) => console.log(data),
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
