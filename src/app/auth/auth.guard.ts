import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { of, switchMap, take } from 'rxjs';

export const AuthGuard = () => {
  const auth = inject(AuthService);
  return auth.userIsAuthenticated.pipe(
    take(1),
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        return auth.autoLogin();
      }
      return of(isAuthenticated);
    })
  );
};
