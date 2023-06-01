import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

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
    private navController: NavController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.loadingController
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((el) => {
        el.present();
        setTimeout(() => {
          el.dismiss();
          this.navController.navigateForward(['/', 'places', 'discover']);
        }, 300);
      });
    this.authService.login();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
    } else {
    }
  }
  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
