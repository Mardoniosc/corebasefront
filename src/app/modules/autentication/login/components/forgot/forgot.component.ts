import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Forgot,
  ErroDTO,
  ErroGeral,
  LoginService,
} from 'src/app/modules/shared';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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

  erroDTO: ErroDTO;

  carregando = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
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
    this.spinner.show();
    if (this.form.invalid) {
      this.spinner.hide();
      this.toast.error('E-mail inválido', 'Erro no preenchimento', {
        timeOut: 3000,
      });
      this.carregando = false;
      return;
    }

    this.forgot = this.form.value;

    this.subscriptions.push(
      this.loginService.forgot(this.forgot).subscribe(
        (data) => {
          this.spinner.hide();
          Swal.fire(
            'Gerado nova senha com sucesso!',
            'Favor verificar seu e-mail',
            'success',
          );
          this.router.navigate(['/login']);
        },
        (err) => {
          this.erroGeral = err.error;
          this.spinner.hide();
          if (this.erroGeral.errors) {
            this.erroGeral.errors.forEach((e) => {
              this.erroDTO = e;
              this.toast.error(
                `Erro ${this.erroGeral.status} ${e.message}`,
                e.fieldName,
                {
                  timeOut: 4000,
                },
              );
            });
          } else {
            const title = `Erro ${this.erroGeral.status}`;
            this.toast.error(this.erroGeral.message, title, {
              timeOut: 4000,
            });
          }
        },
      ),
    );
  }
}
