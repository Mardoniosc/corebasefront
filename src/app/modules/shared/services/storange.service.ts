import { Injectable } from '@angular/core';
import { Usuario, Perfil, Permissoes, PerfilPermissaoDTO } from '../models';
import { STORAGE_KEYS } from '../config';

@Injectable()
export class StorangeService {
  getLocalUser(): Usuario {
    const usr = localStorage.getItem(STORAGE_KEYS.localUser);

    if (usr == null) {
      return null;
    }

    return JSON.parse(usr);
  }

  setLocalUser(obj: Usuario): void {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }

  getLocalPerfils(): Perfil[] {
    const pfs = localStorage.getItem(STORAGE_KEYS.localProfiles);

    if (pfs == null) {
      return null;
    }

    return JSON.parse(pfs);
  }

  setLocalPerfils(obj: Perfil[]): void {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localProfiles);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.localProfiles, JSON.stringify(obj));
  }

  getLocalPermition(): Permissoes[] {
    const pms = localStorage.getItem(STORAGE_KEYS.localPermitions);

    if (pms == null) {
      return null;
    }

    return JSON.parse(pms);
  }

  setLocalPermition(obj: Permissoes[]): void {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localPermitions);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.localPermitions, JSON.stringify(obj));
  }

  getLocalPP(): PerfilPermissaoDTO[] {
    const pps = localStorage.getItem(STORAGE_KEYS.localpefpems);

    if (pps == null) {
      return null;
    }

    return JSON.parse(pps);
  }

  setLocalPP(obj: PerfilPermissaoDTO[]): void {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localpefpems);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.localpefpems, JSON.stringify(obj));
  }
}
