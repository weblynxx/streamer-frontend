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
  city: string;
  street: string;
  house: string;
  houseBuilding: string;
  entrance: string;
  floor: number;
  flat: string;
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
  city: '',
  entrance: '',
  flat: '',
  floor: 1,
  house: '',
  houseBuilding: '',
  street: '',
};

export interface Password {
  data: string;
}

export interface UserPassword {
  password: string;
  userToken: string;
  userId: string;
}
