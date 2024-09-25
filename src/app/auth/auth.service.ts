import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { UserModel } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

interface UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<UserModel>(null);

  private tokenExpirationTimer;
  private signupUrl = environment.signupUrl;
  private signInUrl = environment.signinUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  logout() {
    if (!this.user) return;
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  signUp(email, password) {
    return this.http
      .post<AuthResponseData>(this.signupUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleSignIn(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        }),
      );
  }

  logIn(email, password) {
    return this.http
      .post<AuthResponseData>(this.signInUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleSignIn(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        }),
      );
  }

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const user = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );
    if (!user.token) return;
    this.user.next(user);
    this.autoLogout(
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(),
    );
  }

  private handleSignIn(
    email: string,
    id: string,
    token: string,
    expiresIn: number,
  ) {
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, id, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    console.log(error);
    if (!error.error || !error.error.error) return throwError(errorMessage);
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user with this email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is not correct';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid credentials';
        break;
    }
    return throwError(errorMessage);
  }
}
