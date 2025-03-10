import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { catchError, map, of } from 'rxjs';

export const admGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const _router = inject(Router);
  const name = loginService.getName;
  const token = loginService.getToken;

  if (!name || !token) {
    loginService.logout();
    return _router.createUrlTree(['']);
  }

  return loginService.isTokenValid(token).pipe(
    map((isValid) => {
      if (isValid && name == 'vinicius') {
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
