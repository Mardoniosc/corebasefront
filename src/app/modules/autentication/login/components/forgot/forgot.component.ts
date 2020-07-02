import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Forgot,
  ErroDTO,
  ErroGeral,
  LoginService,
  Usuario,
  UsuarioService,
} from 'src/app/modules/shared';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

interface RadioButtonInterface {
  codigo: number;
  value: number;
}

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;

  private subscriptions: Subscription[] = [];

  usuario = {} as Usuario;

  forgot = {} as Forgot;

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  carregando = false;

  ativado1 = true;

  ativado2 = false;

  ativado3 = false;

  ativado4 = false;

  cpfArray: RadioButtonInterface[] = [];

  anoNascimentoArray: RadioButtonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private loginService: LoginService,
    private userService: UsuarioService,
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

  buscarDadosUser(): void {
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
      this.userService.getUserByEmail(this.forgot.email).subscribe(
        (data) => {
          this.getRandomArbitrary();
          this.spinner.hide();
          this.usuario = data;
          this.ativarDesativaraba(2);
          this.pegando5digitosCPF();
          this.getAnoNascimento();
        },
        (err) => {
          const title = `Erro 404`;
          this.spinner.hide();
          this.toast.error('Usuário não encontrado na base de dados', title, {
            timeOut: 3000,
          });
        },
      ),
    );
  }

  pegando5digitosCPF(): void {
    const cpfcinco = this.usuario.cpf.substr(0, 5);
    const indice = Math.floor(Math.random() * 4);
    const cpfTemp = {} as RadioButtonInterface;
    cpfTemp.codigo = Number(cpfcinco);
    cpfTemp.value = indice;
    this.cpfArray[indice] = cpfTemp;
  }

  getAnoNascimento(): void {
    let anoNascimento = this.usuario.dataNascimento.toString();
    anoNascimento = anoNascimento.substr(0, 4);
    const indice = Math.floor(Math.random() * 4);
    const anoTemp = {} as RadioButtonInterface;
    anoTemp.codigo = Number(anoNascimento);
    anoTemp.value = indice;
    this.anoNascimentoArray[indice] = anoTemp;
  }

  getRandomArbitrary(): void {
    this.cpfArray = [];
    this.anoNascimentoArray = [];
    for (let i = 0; i < 4; i += 1) {
      const randomCpfFake = Math.floor(Math.random() * (99889 - 10000) + 10000);
      const cpfTemp = {} as RadioButtonInterface;
      cpfTemp.codigo = randomCpfFake;
      cpfTemp.value = i;
      this.cpfArray.push(cpfTemp);
    }

    for (let i = 0; i < 4; i += 1) {
      const randomCpfFake = Math.floor(Math.random() * (2020 - 1920) + 1920);
      const dataNasicimentoTemp = {} as RadioButtonInterface;
      dataNasicimentoTemp.codigo = randomCpfFake;
      dataNasicimentoTemp.value = i;
      this.anoNascimentoArray.push(dataNasicimentoTemp);
    }
  }

  ativarDesativaraba(numeroAba: number): void {
    switch (numeroAba) {
      case 1:
        this.ativado1 = true;
        document.getElementById('aba1').click();
        break;
      case 2:
        this.ativado2 = true;
        document.getElementById('aba2').click();
        break;
      case 3:
        this.ativado3 = true;
        document.getElementById('aba3').click();
        break;
      case 4:
        this.ativado4 = true;
        document.getElementById('aba4').click();
        break;
      default:
        this.ativado1 = true;
        document.getElementById('aba1').click();
    }
  }

  enviarEmail() {
    this.spinner.show();
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
