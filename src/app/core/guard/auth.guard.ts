import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const loggedUser = this.loginService.loggedUser;
    const url = route.url;
    if (loggedUser) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { error: 'Deve fazer o login antes de acessar a ' + url },
    });
    return false;
  }
}

export const authGuard: CanActivateFn = route => {
  return inject(PermissionsService).canActivate(route);
};
