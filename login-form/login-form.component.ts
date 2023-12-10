import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IAuthForm } from '../contracts/IAuthForm';
import { UIStateStatusCode, UiNotificationService } from '../../partials/ui-notification/ui-notification.service';
import { AUTH_CONFIG } from '../constants/auth';
import { IAuthConfig } from '../contracts/IAuthConfig';
// import { UIStateProvider, UI_STATE_PROVIDER } from '../../partials/ui-state/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  performingAction = false;
  logoAssetPath = '';
  moduleName = 'login-form';
  companyName = 'Google';

  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  passwordFormType = "password";

  constructor(private authService: AuthService, 
    @Inject(AUTH_CONFIG) private authConfig: IAuthConfig,
    // @Inject(UI_STATE_PROVIDER) private uiState: UIStateProvider
    private uiStateService: UiNotificationService,
    ) { }

  ngOnInit(): void {
  }

  onTogglePasswordType(): void {
    this.passwordFormType = this.passwordFormType === "password" ? "text" : "password";
  }

  onSubmit() {
    this.performingAction = true;
    this.uiStateService.startAction();
    const data: IAuthForm = {
      username: this.formGroup.get('username')?.value || "",
      password: this.formGroup.get('password')?.value || "",
    };

    this.authService.login(data).then((e) => {
      this.performingAction = false;
      if (false == e) {
        this.uiStateService.endAction(UIStateStatusCode.UNAUTHENTICATED);
      } else {
        // this.authConfig.responseHandler(e);
        const result: { authToken: string} = this.authConfig.responseHandler(e);
        console.log(result);
        this.authService.loginSuccessFull(result).then(() => {});
        this.uiStateService.endAction(UIStateStatusCode.AUTHENTICATED);
      }
    });
  }

}
