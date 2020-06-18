import { Component, OnInit } from '@angular/core';
import {
  Perfil,
  PerfilService,
  Permissoes,
  PermissaoService,
  PerfilPermissaoService,
  PerfilPermissaoDTO,
} from 'src/app/modules/shared';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  perfils: Perfil[];

  status: string;

  permissoes: Permissoes[];

  perfilPermi: PerfilPermissaoDTO;

  perfilPermissao: PerfilPermissaoDTO[];

  constructor(
    private perfilService: PerfilService,
    private permissaoService: PermissaoService,
    private perfilPermissaoService: PerfilPermissaoService,
  ) {}

  ngOnInit(): void {
    this.carregaPerfils();
    this.carregaPermissoes();
    this.carregaPerfilHasPermition();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  carregaPerfils() {
    this.subscriptions.push(
      this.perfilService.getAll().subscribe(
        (data) => {
          this.perfils = data;
        },
        (err) => console.log(err),
      ),
    );
  }

  carregaPermissoes() {
    this.subscriptions.push(
      this.permissaoService.getAll().subscribe(
        (data) => {
          this.permissoes = data;
        },
        (err) => console.log(err),
      ),
    );
  }

  carregaPerfilHasPermition() {
    this.subscriptions.push(
      this.perfilPermissaoService.getAll().subscribe(
        (data) => {
          this.perfilPermissao = data;
        },
        (err) => console.log(err),
      ),
    );
  }

  verificaPermissao(perfil: number, permissao: number): boolean {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao,
    );
    if (response) {
      return true;
    }
    return false;
  }

  atualizaStatus(perfil: number, permissao: number) {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao,
    );

    if (!response) {
      console.log('Erro ao tentar atualizar!');
      return;
    }
    this.perfilPermi = response;
    if (this.perfilPermi.status === 1) {
      this.status = 'desetivar';
    } else {
      this.status = 'ativar';
    }

    swal({
      title: `Deseja ${this.status} permissao?`,
      icon: 'warning',
      closeOnClickOutside: true,
      buttons: [true, 'Confirma'],
    }).then((value) => {
      if (value) {
        this.perfilPermi.status = this.status === 'ativar' ? 1 : 0;
        this.perfilPermissaoService.update(this.perfilPermi).subscribe(
          (data) => {
            swal('   ', {
              title: this.status === 'ativar' ? 'Ativado!' : 'Desativado',
              icon: 'success',
              buttons: [false],
              timer: 1000,
            });
          },
          (err) => console.log(err),
        );
      }
    });
  }

  pegaStatusAtual(perfil: number, permissao: number): string {
    const response = this.perfilPermissao.find(
      (x) => x.perfilId === perfil && x.permissaoId === permissao,
    );
    if (!response) {
      return 'dafault';
    }
    return response.status === 1 ? 'primary' : 'dafault';
  }
}
