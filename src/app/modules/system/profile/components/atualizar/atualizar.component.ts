import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  PerfilDTO,
  PerfilService,
  ErroDTO,
  ErroGeral,
} from '../../../../shared';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css'],
})
export class AtualizarComponent implements OnInit {
  erroGeral = {} as ErroGeral;

  erroDTO: ErroDTO;

  private subscriptions: Subscription[] = [];

  form: FormGroup;

  perfil = {} as PerfilDTO;

  idPerfil: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private snackBar: MatSnackBar,
    private perfilService: PerfilService,
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.idPerfil = this.route.snapshot.paramMap.get('perfilId');
    this.carregaPerfilNome(Number(this.idPerfil));
  }

  criarForm(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregaPerfilNome(id: number): void {
    this.subscriptions.push(
      this.perfilService.getId(id).subscribe((data) => {
        this.perfil = data;
      }),
    );
  }

  atualizarPerfil(): void {
    if (this.form.invalid) {
      this.snackBar.open('Formulário com campos invalidos!', 'Erro!', {
        duration: 3000,
      });
      this.toucheCamposFormulario();
      return;
    }

    this.perfil = this.form.value;
    this.subscriptions.push(
      this.perfilService.update(Number(this.idPerfil), this.perfil).subscribe(
        (data) => {
          Swal.fire({
            title: 'Atualizado!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.refresh();
          }, 1900);
        },
        (err) => {
          this.erroGeral = err.error;

          if (this.erroGeral.errors) {
            this.erroGeral.errors.forEach((e) => {
              this.erroDTO = e;
              this.toast.error(
                `Erro ${this.erroGeral.status} ${e.message}`,
                e.fieldName,
                { timeOut: 4000 },
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

  toucheCamposFormulario(): void {
    this.form.get('nome').markAsTouched();
  }

  refresh(): void {
    window.location.reload();
  }
}
