import { InjectionToken } from "@angular/core";
import { IAuthConfig } from "../contracts/IAuthConfig";

export const AUTH_CONFIG = new InjectionToken<IAuthConfig>(
  "Injection du token AuthServiceConfig"
);

export const AUTH_LOCAL_DATA = "AUTH_LOCAL_DATA";
export const AUTH_USER_LOCAL_DATA = "AUTH_USER_LOCAL_DATA";
