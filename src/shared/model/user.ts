export interface Streamer {
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
  streamerId: string;
}
export const StreamerEmpty: Streamer = {
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
  streamerId: '',
};

export interface Password {
  data: string;
}

export interface UserPassword {
  password: string;
  userToken: string;
  userId: string;
}
