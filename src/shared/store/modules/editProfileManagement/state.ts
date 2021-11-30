import { StreamerEmpty } from '@/shared/model/user';
import { EditProfileManagementState } from './types';

export const state = (): EditProfileManagementState => initialState();

export const initialState = (): EditProfileManagementState => ({
  currentUser: {
    ...StreamerEmpty,
  },
  isLoadingCurrentUser: false,
  newPassword: '',
});
