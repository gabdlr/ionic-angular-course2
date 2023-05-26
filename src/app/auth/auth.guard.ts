import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';
export const AuthGuard = () => {
  const auth = inject(AuthService);
  const router = inject(NavController);
  if (!auth.userIsAuthenticated) {
    router.navigateBack(['/', 'auth']);
    return false;
  }
  return auth.userIsAuthenticated;
};
