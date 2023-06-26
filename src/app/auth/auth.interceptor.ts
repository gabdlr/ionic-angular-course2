import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (auth.token) {
    const params = req.params.append('auth', auth.token);
    const newRequest = req.clone({ params });
    console.log(newRequest);
    return next(newRequest);
  }
  return next(req);
};
