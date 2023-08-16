import axios from "axios";
import { setStorageItem } from "../../lib/localStorage";
import { AUTH_TOKEN_LOCAL_KEY } from "../constants";

type AccessToken = {
  access_token: string;
}

type LoginArgs = {
  username: string;
  password: string;
}

type ForgotPasswordArgs = {
  email: string;
}

type ResetPasswordArgs = {
  password: string;
  token: string;
}

type BaseAuthAPIArgs = {
  meUrl: string;
  loginUrl: string;
  logoutUrl: string;
  forgotPasswordUrl: string;
  resetPasswordUrl: string;
}

interface IAuthAPI {
    login: (data: LoginArgs) => Promise<AccessToken>;
    logout: () => Promise<void>;
    forgotPassword: (data: ForgotPasswordArgs) => Promise<void>;
    resetPassword: (data: ResetPasswordArgs) => Promise<void>;
    me: () => Promise<User>;
}

class BaseAuthAPI implements IAuthAPI  {
  meUrl: string;
  loginUrl: string;
  logoutUrl: string;
  forgotPasswordUrl: string;
  resetPasswordUrl: string;

  constructor(params: BaseAuthAPIArgs) {
    this.meUrl = params.meUrl;
    this.loginUrl = params.loginUrl;
    this.logoutUrl = params.logoutUrl;
    this.forgotPasswordUrl = params.forgotPasswordUrl;
    this.resetPasswordUrl = params.resetPasswordUrl;
  }

    async login(data: LoginArgs): Promise<AccessToken> {
      const result = await axios.post<AccessToken>(this.loginUrl, data)
      setStorageItem(AUTH_TOKEN_LOCAL_KEY, result.data.access_token);
      
      return {
        access_token: result.data.access_token
      }
    }

    async me (): Promise<User> {
      const token = localStorage.getItem(AUTH_TOKEN_LOCAL_KEY);

      if (!token) 
        throw new Error("No token found");

      const result = await axios.post<User>(this.meUrl, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return result.data
    }

    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    forgotPassword(data: ForgotPasswordArgs): Promise<void> {
      console.log("forgotPassword", data)
        throw new Error("Method not implemented.");
    }

    resetPassword(data: ResetPasswordArgs): Promise<void> {
      console.log("resetPassword", data)
        throw new Error("Method not implemented.");
    }

}
  
export default BaseAuthAPI;
  