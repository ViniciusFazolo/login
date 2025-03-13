import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { catchError, map, of } from 'rxjs';

export const admGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const _router = inject(Router);
  const role = loginService.getRole;
  const token = loginService.getToken;

  if (!role || !token) {
    loginService.logout();
    return _router.createUrlTree(['']);
  }

  return loginService.isTokenValid(token).pipe(
    map((isValid) => {
      if (isValid && role == 'ADMIN') {
        return true;
      }

      loginService.logout();
      return _router.createUrlTree(['']);
    }),
    catchError(() => {
      loginService.logout();
      return of(_router.createUrlTree(['']));
    })
  );
};
