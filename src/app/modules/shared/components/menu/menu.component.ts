import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario, Permissoes, PerfilPermissaoDTO } from '../../models';
import { StorangeService, PerfilPermissaoService } from '../../services';
import { API_CONFIG } from '../../config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario = {} as Usuario;

  baseUrlServidor = API_CONFIG.baseUrl;

  permissoes: Permissoes[];

  permissoesFiltradas: Permissoes[];

  private subscriptions: Subscription[] = [];

  perfilPermissaoDTO = {} as PerfilPermissaoDTO;

  constructor(
    private storange: StorangeService,
    private perfilPermissaoService: PerfilPermissaoService,
  ) {}

  ngOnInit(): void {
    this.usuario = this.storange.getLocalUser();
    this.permissoes = this.usuario.perfil.permissoes;
    this.permissoesFiltradas = this.permissoes;
    this.filtrarPermissoesStatus();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  logoff() {
    localStorage.clear();
  }

  filtrarPermissoesStatus(): void {
    this.permissoes.forEach((x) => {
      this.subscriptions.push(
        this.perfilPermissaoService
          .getId(this.usuario.perfil.id, x.id)
          .subscribe(
            (data) => {
              this.perfilPermissaoDTO = data;
              if (this.perfilPermissaoDTO.status === 0) {
                this.permissoesFiltradas = this.permissoesFiltradas.filter(
                  (p) => {
                    return p.id !== x.id;
                  },
                );
                return data;
              }
              return data;
            },
            (err) => console.log(err),
          ),
      );
    });
  }

  retornaicone(descricao: string): string {
    switch (descricao) {
      case 'Usuário':
        return 'user';
      case 'Perfil':
        return 'users';
      case 'Permissão':
        return 'lock';
      case 'Dashboard':
        return 'dashboard';
      case 'Home':
        return 'home';
      case 'Log':
        return 'copy';
      default:
        return 'drupal';
    }
  }
}
