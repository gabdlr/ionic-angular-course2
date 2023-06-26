import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { EMPTY, Observable, catchError, finalize } from 'rxjs';
import { AuthErrorResponse } from './AuthErrorResponse';
import { AuthErrorDictionary } from './AuthErrorDictionary';
import { AuthResponse } from './AuthResponse.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLoginMode = true;
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navController: NavController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    if (form.invalid) return;
    const email = form.value.email;
    const password = form.value.password;
    const loading = await this.loadingController.create({
      keyboardClose: true,
      message: this.isLoginMode ? 'Logging in' : 'Signing up',
    });

    loading.present();
    let action: Observable<AuthResponse>;
    if (this.isLoginMode) {
      action = this.loginUser(email, password);
    } else {
      action = this.signupUser(email, password);
    }
    action
      .pipe(
        finalize(() => loading.dismiss()),
        catchError((error: AuthErrorResponse) => {
          if (error.status === 400) {
            this.showError(
              'Error',
              AuthErrorDictionary[error.error.error.message] ??
                'An error has occured'
            );
          } else {
            this.showError('Error', 'An unknown error has occured');
          }
          return EMPTY;
        })
      )
      .subscribe(() =>
        this.navController.navigateForward(['/', 'places', 'discover'])
      );
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private loginUser(email: string, password: string) {
    return this.authService.login(email, password);
  }

  private signupUser(email: string, password: string) {
    return this.authService.singup(email, password).pipe();
  }

  private async showError(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });
    alert.present();
  }
}
