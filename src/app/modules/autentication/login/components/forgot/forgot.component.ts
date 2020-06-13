import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  enviarEmail() {
    console.log(this.form.value);
  }
}
