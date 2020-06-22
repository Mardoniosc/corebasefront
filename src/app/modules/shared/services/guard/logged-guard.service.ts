import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorangeService } from '../storange.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorangeService,
  ) {}

  canActivate(): boolean {
    const userLogged = this.storageService.getLocalUser();
    if (userLogged) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
