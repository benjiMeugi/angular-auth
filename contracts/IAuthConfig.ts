import { IUser } from "./IUser";

export interface IAuthConfig {
    loginUrl: string;
    logoutUrl: string;
    userUrl: string;
    redirectUrl: string;
    responseHandler: (response: any) => { authToken: string; user: IUser };
}