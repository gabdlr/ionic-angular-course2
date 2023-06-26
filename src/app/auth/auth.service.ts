import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { AuthResponse } from './AuthResponse.model';
import { BehaviorSubject, Subscription, from, map, tap, timer } from 'rxjs';
import { User } from './user';
import { Preferences } from '@capacitor/preferences';
const AUTH_DATA = 'authData';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User | null>(null);
  private _logoutTimer?: Subscription;
  private setUser = tap((authResponse: AuthResponse) => {
    const { localId, email, idToken, expiresIn } = authResponse;
    const tokenExpirationDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );
    this.autoLogout(new Date(tokenExpirationDate));
    this._user.next(new User(localId, email, idToken, tokenExpirationDate));
    this.storeAuthData(
      localId,
      email,
      idToken,
      tokenExpirationDate.toISOString()
    );
  });

  constructor(
    private httpClient: HttpClient,
    private navController: NavController
  ) {}
  ngOnDestroy(): void {
    this._logoutTimer?.unsubscribe();
  }

  get token() {
    return this._user.getValue()?.token;
  }

  get userId() {
    return this._user.getValue()?.id;
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(map((user) => Boolean(user?.token)));
  }

  autoLogin() {
    return from(Preferences.get({ key: AUTH_DATA })).pipe(
      map((result) => {
        if (!result.value) {
          return false;
        }
        const storedAuthData: {
          userId: string;
          email: string;
          token: string;
          tokenExpirationDate: string;
        } = JSON.parse(result.value);
        const expirationDate = new Date(storedAuthData.tokenExpirationDate);
        if (expirationDate <= new Date()) {
          return false;
        }
        const { userId, email, token } = storedAuthData;
        const user = new User(userId, email, token, expirationDate);
        this.autoLogout(expirationDate);
        this._user.next(user);
        return Boolean(user);
      })
    );
  }

  autoLogout(duration: Date) {
    if (this._logoutTimer) this._logoutTimer.unsubscribe();
    this._logoutTimer = timer(duration)
      .pipe(tap(() => this.logout()))
      .subscribe();
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseWebAPIKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(this.setUser);
  }

  async logout() {
    await Preferences.remove({ key: AUTH_DATA });
    this._user.next(null);
    this._logoutTimer?.unsubscribe();
    this.navController.navigateForward(['/', 'auth']);
  }

  singup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseWebAPIKey}
    `,
        { email, password, returnSecureToken: true }
      )
      .pipe(this.setUser);
  }

  private async storeAuthData(
    userId: string,
    email: string,
    token: string,
    tokenExpirationDate: string
  ) {
    const authData = JSON.stringify({
      userId,
      email,
      token,
      tokenExpirationDate,
    });
    await Preferences.set({ key: AUTH_DATA, value: authData });
  }
}
