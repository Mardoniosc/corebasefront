import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorangeService } from '../storange.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoggedService {
  constructor(private storange: StorangeService) {}

  userLogged(): boolean {
    const localUser = this.storange.getLocalUser();
    return !!localUser;
  }
}
