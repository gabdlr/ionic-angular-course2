import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userId = 'usr007';
  private _userIsAuthenticated = false;
  constructor(private navController: NavController) {}
  get userId() {
    return this._userId;
  }
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
  login() {
    this._userIsAuthenticated = true;
  }
  logout() {
    this._userIsAuthenticated = false;
    this.navController.navigateForward(['/', 'auth']);
  }
}
