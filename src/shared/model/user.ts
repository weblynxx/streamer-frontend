export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  userName: string;
  password: string;
  authorities: string;
  emailConfirmed: boolean;
  role: string;
  token: string;
}
export const UserEmpty: User = {
  id: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  phone: '',
  userName: '',
  password: '',
  authorities: '',
  emailConfirmed: false,
  role: '',
  token: '',
};

export interface Password {
  data: string;
}

export interface UserPassword {
  password: string;
  userToken: string;
  userId: string;
}
