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
  intercomCode: string;
  from: string;
  to: string;
  isStoppedDelivery: boolean;
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
  intercomCode: '',
  from: '',
  to: '',
  isStoppedDelivery: false,
};

export interface Password {
  data: string;
}

export interface UserPassword {
  password: string;
  userToken: string;
  userId: string;
}
