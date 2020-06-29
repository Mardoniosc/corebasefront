import { Component, OnInit } from '@angular/core';
import {
  StorangeService,
  Permissoes,
  PermissaoService,
  PermissaoDTO,
  ErroGeral,
  ErroDTO,
} from 'src/app/modules/shared';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css'],
})
export class CreateNewComponent implements OnInit {
  permissoes: Permissoes[];

  permissaoDTO = {} as PermissaoDTO;

  form: FormGroup;

  erroGeral = {} as ErroGeral;

  erroDTO = {} as ErroDTO;

  constructor(
    private storangeService: StorangeService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private permissoesSerivce: PermissaoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.carregaPermissoes();
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
      url: ['', [Validators.required]],
      permissaopai: ['', Validators.required],
    });
  }

  carregaPermissoes(): void {
    this.permissoesSerivce.getAll().subscribe(
      (data) => {
        this.permissoes = data;
        this.storangeService.setLocalPermition(this.permissoes);
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
    );
  }

  cadastrarNovaPermissao(): void {
    if (this.form.invalid) {
      const msg = 'Preenchimento do formulário inválido!';
      this.snackBar.open(msg, 'Erro validação', { duration: 4000 });
    }

    this.permissaoDTO.descricao = this.form.value.descricao;
    this.permissaoDTO.url = this.form.value.url;
    if (this.form.value.permissaopai !== '0') {
      this.permissaoDTO.permissaoPai = this.form.value.permissaopai;
    } else {
      this.permissaoDTO.permissaoPai = null;
    }

    this.permissoesSerivce.insert(this.permissaoDTO).subscribe(
      (data) => {
        this.toast.success('Permissão Cadastrada com sucesso!', 'Sucesso', {
          timeOut: 4000,
        });

        setTimeout(() => {
          this.refresh();
        }, 3900);
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
    );
  }

  refresh(): void {
    window.location.reload();
  }
}
