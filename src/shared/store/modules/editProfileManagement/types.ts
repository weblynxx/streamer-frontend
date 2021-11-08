import { User } from '../../../model/user';

export interface EditProfileManagementState {
  [key: string]: any;
  currentUser: User;
  newPassword: string;
  isLoadingCurrentUser: boolean;
}
