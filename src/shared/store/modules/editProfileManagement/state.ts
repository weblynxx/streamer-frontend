import { EditProfileManagementState } from './types';

export const state = (): EditProfileManagementState => initialState();

export const initialState = (): EditProfileManagementState => ({
  currentUser: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userName: '',
    password: '',
    authorities: '',
    emailConfirmed: false,
    role: '',
    token: '',
    fullName: '',
  },
  isLoadingCurrentUser: false,
  newPassword: '',
});
