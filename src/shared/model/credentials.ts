export interface Credentials {
  id?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  username?: string;
  authorities: string;
  rememberMe?: boolean;
  emailConfirmed: boolean;
  inactivityMinutes: number;
}
