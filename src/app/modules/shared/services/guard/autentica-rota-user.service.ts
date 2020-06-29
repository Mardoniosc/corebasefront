import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { StorangeService } from '../storange.service';

@Injectable()
export class AutenticaRotaSerivce implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorangeService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const userLogged = this.storageService.getLocalUser();

    const pp = this.storageService.getLocalPP();

    const { url } = state;

    const urlValida = userLogged.perfil?.permissoes?.find((u) => u.url === url);

    if (urlValida) {
      const statusURLPerfil = pp.find(
        (p) =>
          p.perfilId === userLogged.perfil?.id &&
          p.permissaoId === urlValida.id,
      );

      if (statusURLPerfil.status === 1) {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
