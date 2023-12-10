import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { IAuthConfig } from './contracts/IAuthConfig';
import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_CONFIG } from './constants/auth';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class AuthModule {
  static forRoot(config: IAuthConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AUTH_CONFIG, useValue: config }
      ]
    };
  }
}
