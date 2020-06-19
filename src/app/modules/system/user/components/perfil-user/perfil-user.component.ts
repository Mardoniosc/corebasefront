import { Component, OnInit } from '@angular/core';

import { API_CONFIG } from 'src/app/modules/shared/config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Usuario, StorangeService, UsuarioService } from '../../../../shared';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  usuario = {} as Usuario;

  file = new FormData();

  baseUrlServidor = API_CONFIG.baseUrl;

  form: FormGroup;

  constructor(
    private storangeService: StorangeService,
    private snackBar: MatSnackBar,
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
    if (this.form.invalid) {
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
          this.snackBar.open('Imagem atualizada com sucesso', 'Sucesso', {
            duration: 3000,
          });
          setTimeout(() => {
            this.refresh();
          }, 1000);
        },
        (err) => {
          const title = err.error.error;
          const msg = 'Necessário selecionar uma nova imagem';
          const { status } = err.error;

          this.snackBar.open(msg, `${title} ${status}`, { duration: 3000 });
        },
      ),
    );
  }

  refresh() {
    window.location.reload();
  }
}
