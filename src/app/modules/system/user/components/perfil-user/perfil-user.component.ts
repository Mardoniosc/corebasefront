import { Component, OnInit } from '@angular/core';

import { API_CONFIG } from 'src/app/modules/shared/config';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {
  Usuario,
  StorangeService,
  UsuarioService,
  ErroGeral,
  ErroDTO,
} from '../../../../shared';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  usuario = {} as Usuario;

  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  file = new FormData();

  baseUrlServidor = API_CONFIG.baseUrl;

  form: FormGroup;

  constructor(
    private storangeService: StorangeService,
    private snackBar: MatSnackBar,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.carregaDadosUsuario();
    this.criarForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  criarForm(): void {
    this.form = this.fb.group({
      file: [''],
    });
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  carregaDadosUsuario(): void {
    this.usuario = this.storangeService.getLocalUser();
  }

  atualizarImagePerfil(): void {
    this.spinner.show();
    if (this.form.invalid) {
      this.spinner.hide();

      this.snackBar.open(
        'Favor selecionar nova imagem de perfil',
        'Erro 404 Not Found',
        {
          duration: 3000,
        },
      );
    }

    this.file.append('file', this.form.get('file').value);
    this.subscriptions.push(
      this.usuarioService.updateImage(this.file, this.usuario.id).subscribe(
        (data) => {
          this.spinner.hide();
          Swal.fire({
            title: 'sucesso',
            text: 'Imagem do perfil atualizada!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          });
          this.atualizaDadosUser();
          setTimeout(() => {
            this.refresh();
          }, 1000);
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
              timeOut: 3000,
            });
          }
        },
      ),
    );
  }

  atualizaDadosUser(): void {
    this.storangeService.setLocalUser(null);
    this.usuarioService.getUserById(this.usuario.id).subscribe((data) => {
      this.storangeService.setLocalUser(data);
      this.carregaDadosUsuario();
    });
  }

  refresh() {
    window.location.reload();
  }
}
