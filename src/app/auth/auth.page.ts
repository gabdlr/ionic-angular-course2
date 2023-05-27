import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
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
}
