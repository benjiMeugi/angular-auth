import { CanActivateFn } from '@angular/router';
import { AUTH_LOCAL_DATA } from './constants/auth';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);

  let authData = localStorage.getItem(AUTH_LOCAL_DATA) 
  if (authData != null && JSON.parse(authData).authToken) {
    return true;
  }
  authService.loginPage();
  return false;
};
