import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Login,
  LoginService,
  ErroGeral,
  ErroDTO,
  UserLoggedService,
  StorangeService,
  PerfilPermissaoService,
} from 'src/app/modules/shared';

import { ToastrService } from 'ngx-toastr';

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
    private storangeService: StorangeService,
    private ppService: PerfilPermissaoService,
    private userLoggedService: UserLoggedService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.criarForm();
    this.verificaUserLogged();
  }

  verificaUserLogged(): void {
    const logado = this.userLoggedService.userLogged();

    if (logado) {
      this.router.navigate(['/dashboard']);
    }
  }

  criarForm(): void {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logar(): void {
    this.spinner.show();
    if (this.form.invalid) {
      this.toast.error(
        'Preechimento inválido do formularios de login',
        'Erro ao ler dados',
        { timeOut: 3000 },
      );
      this.spinner.hide();
      return;
    }

    this.login = this.form.value;
    this.carregaPerfilPermissoesLocalStorange();
    this.subscriptions.push(
      this.loginService.logar(this.login).subscribe(
        (data) => {
          if (data.status === 1) {
            this.storangeService.setLocalUser(data);
            this.spinner.hide();
            this.refresh();
          } else {
            this.spinner.hide();
            this.toast.error('Usuario Desativado', 'Erro', {
              timeOut: 4000,
            });
          }
        },
        (err) => {
          this.erroGeral = err.error;

          if (this.erroGeral.errors) {
            this.erroGeral.errors.forEach((e) => {
              this.erroDTO = e;
              this.spinner.hide();
              this.toast.error(
                `Erro ${this.erroGeral.status} ${e.message}`,
                e.fieldName,
                { timeOut: 4000 },
              );
            });
          } else {
            const title = `Erro ${this.erroGeral.status}`;
            this.spinner.hide();
            this.toast.error(this.erroGeral.message, title, {
              timeOut: 3000,
            });
          }
        },
      ),
    );
  }

  refresh(): void {
    window.location.reload();
  }

  carregaPerfilPermissoesLocalStorange(): void {
    console.log('salvando');
    this.ppService.getAll().subscribe((data) => {
      this.storangeService.setLocalPP(data);
    });
  }
}
