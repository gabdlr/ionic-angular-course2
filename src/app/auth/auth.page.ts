import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(
    private authService: AuthService,
    private navController: NavController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.navController.navigateForward(['/', 'places', 'discover']);
  }
}
