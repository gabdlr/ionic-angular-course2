import { HttpErrorResponse } from '@angular/common/http';

export declare class AuthErrorResponse extends HttpErrorResponse {
  error: {
    error: {
      code: number;
      errors: { message: string; domain: string; reason: string }[];
      message: string;
    };
  };
}
