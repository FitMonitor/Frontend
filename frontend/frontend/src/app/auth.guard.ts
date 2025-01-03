import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token && !jwtHelper.isTokenExpired(token)) {
    const decodedToken = jwtHelper.decodeToken(token);
    const requiredRoles = route.data?.['roles'] || [];
    const userRoles = decodedToken['cognito:groups'] || [];

    console.log('requiredRoles', requiredRoles);
    console.log('userRoles', userRoles);

    if (requiredRoles.some((role: string) => userRoles.includes(role))) {
      return true;
    }
  }

  router.navigate(['/']);
  return false;
};

  