import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService)
  const _router = inject(Router)
  
  const token = _loginService.getToken;
  const name = _loginService.getName;
      
  if (!token || !name) {
    return _router.createUrlTree(['']);
  }

  return _loginService.isTokenValid(token).pipe(
    map((isValid) => {
      if (isValid) {
        return true; 
      } else {
        _loginService.logout()
        return _router.createUrlTree(['']); 
      }
    }),
    catchError(() => {
      _loginService.logout()
      return of(_router.createUrlTree(['']));
    })
  );
};
