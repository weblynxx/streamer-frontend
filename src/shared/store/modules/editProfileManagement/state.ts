import { UserEmpty } from '@/shared/model/user';
import { EditProfileManagementState } from './types';

export const state = (): EditProfileManagementState => initialState();

export const initialState = (): EditProfileManagementState => ({
  currentUser: {
    ...UserEmpty,
  },
  isLoadingCurrentUser: false,
  newPassword: '',
});
