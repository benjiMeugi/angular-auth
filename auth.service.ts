import { Inject, Injectable } from '@angular/core';
import { IAuthConfig } from './contracts/IAuthConfig';
import { AUTH_CONFIG, AUTH_LOCAL_DATA, AUTH_USER_LOCAL_DATA } from './constants/auth';
import { HttpClient } from '@angular/common/http';
import { catchError, lastValueFrom, of, throwError } from 'rxjs';
import { IAuthForm } from './contracts/IAuthForm';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/application/routing/app-routes';
import { UIStateStatusCode, UiNotificationService } from '../partials/ui-notification/ui-notification.service';
import { IUser } from './contracts/IUser';


interface AuthResponse {
  authToken: string;
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(AUTH_CONFIG) private authConfig: IAuthConfig,
    private httpClient: HttpClient,
    // @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider,
    private uiStateService: UiNotificationService,

    private router: Router,
  ) { }

  async login(loginData: IAuthForm): Promise<any> {
    const response: any = await lastValueFrom(
      this.httpClient.post(this.authConfig.loginUrl, loginData)
        .pipe(
          catchError((error) => {
            console.error(error);
            // return "erreur";
            return of(false);
            // return this.authConfig.responseHandler(error);
            //  return throwError(() => "Réponse Invalide");
          })
        )
    );
    return response;
  }

  async loginSuccessFull(response: { authToken: string, user?: IUser }) {
    if (response.authToken) {
      localStorage.setItem(AUTH_LOCAL_DATA, JSON.stringify(response));
    }

    let user = null;
    if (response.user) {
      user = response.user;
    } else {
      user = await lastValueFrom(this.httpClient.get(this.authConfig.userUrl, { headers: { 'Authorization': 'Bearer ' + response.authToken } }));
    }

    localStorage.setItem(AUTH_USER_LOCAL_DATA, JSON.stringify(user));
    this.uiStateService.endAction(UIStateStatusCode.AUTHENTICATED);
    this.router.navigate([this.authConfig.redirectUrl]);
  }

  getPermissions(): string[] {
    return JSON.parse(localStorage.getItem(AUTH_LOCAL_DATA) || "").scopes;
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(AUTH_LOCAL_DATA) || "").authToken;
  }

  getUser(): IUser {
    return JSON.parse(localStorage.getItem(AUTH_USER_LOCAL_DATA) || "");
  }

  logout() {
    localStorage.removeItem(AUTH_LOCAL_DATA);
    localStorage.removeItem(AUTH_USER_LOCAL_DATA);
    this.router.navigate([appRoutes.loginModule.module]);
  }

  loginPage() {
    return this.router.navigate([appRoutes.loginModule.module, appRoutes.loginModule.login])
  }
}
