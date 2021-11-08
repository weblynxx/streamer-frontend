import { AxiosPromise } from 'axios';
import { instance } from '.';
import { URLS } from './index';
import { Customer } from '../model/customer';
import { ChangePassword } from '../model/changePassword';
import { PasswordResetFinish } from '../model/passwordResetFinish';
import { IdToken } from '../model/idToken';
import { Credentials } from '../model/credentials';
import { User } from '../model/user';

export interface BackendAccount {
  authenticate: (
    username: string,
    password: string,
    rememberMe?: boolean
  ) => AxiosPromise<{
    userName: string;
    userTypeName: string;
    companyId: string;
    userId: string;
    refresh_token: string;
  }>;
  createStreamer: (payload: any) => AxiosPromise<User>;
  getMyAccount: () => AxiosPromise<any>;
  getMyAccountWithPassword: (id: number) => AxiosPromise<User>;
  changeMyPassword: (oldPassword: string, newPassword: string) => AxiosPromise;
  initResetPassword: (email: string) => AxiosPromise;
  checkPasswordReset: (key: string) => AxiosPromise;
  finishResetPassword: (key: string, newPassword: string) => AxiosPromise;
  logout: () => AxiosPromise;
}

export const defaultBackendAccount: BackendAccount = {
  authenticate(
    username: string,
    password: string,
    rememberMe?: boolean
  ): AxiosPromise<{
    userName: string;
    userTypeName: string;
    companyId: string;
    userId: string;
    refresh_token: string;
  }> {
    const credentials: Credentials = {
      password,
      username,
      rememberMe,
      authorities: '',
      emailConfirmed: false,
      inactivityMinutes: 0,
    };
    return instance.post<any>(`${URLS.authenticate}`, credentials);
  },
  createStreamer(payload: any): AxiosPromise<User> {
    var newEmployee = payload.newEmployee;
    return instance.post<User>(`${URLS.account}/CreateStreamer`, {
      FirstName: newEmployee.firstName,
      LastName: newEmployee.lastName,
      Email: newEmployee.email,
      UserName: newEmployee.userName,
      Password: newEmployee.password,
      Authorities: newEmployee.authorities,
    });
  },
  getMyAccount(): AxiosPromise<any> {
    return instance.get<any>(`${URLS.account}/GetMe`);
  },
  getMyAccountWithPassword(id: number): AxiosPromise<User> {
    return instance.get<User>(`${URLS.account}/${id}/password`);
  },
  changeMyPassword(currentPassword: string, newPassword: string): AxiosPromise {
    const changePassword: ChangePassword = {
      currentPassword,
      newPassword,
    };
    return instance.post(`${URLS.account}/change-password`, changePassword);
  },
  initResetPassword(email: string): AxiosPromise {
    return instance.post(`${URLS.account}/reset-password-init`, email, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  checkPasswordReset(key: string): AxiosPromise {
    return instance.post(`${URLS.account}/reset-password-check`, key, {
      headers: { 'Content-Type': 'application/json' },
    });
  },
  finishResetPassword(key: string, newPassword: string): AxiosPromise {
    const passwordResetFinish: PasswordResetFinish = {
      key,
      newPassword,
    };
    return instance.post(
      `${URLS.account}/reset-password-finish`,
      passwordResetFinish
    );
  },
  logout(): AxiosPromise {
    return instance.post(`${URLS.account}/logout`);
  },
};
