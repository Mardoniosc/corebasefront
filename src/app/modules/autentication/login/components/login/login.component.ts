import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login, LoginService } from 'src/app/modules/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  login = {} as Login;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logar() {
    if (this.form.invalid) {
      console.log('usuario ou senha incorreto');
      return;
    }
    this.login = this.form.value;
    this.subscriptions.push(
      this.loginService.logar(this.login).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => console.log(err),
      ),
    );
    // this.router.navigate(['/dashboard']);
  }
}
