import { Streamer } from '../../../model/user';

export interface EditProfileManagementState {
  [key: string]: any;
  currentUser: Streamer;
  newPassword: string;
  isLoadingCurrentUser: boolean;
}
