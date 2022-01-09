import { Streamer } from '../../../model/user';

export interface EditProfileManagementState {
  [key: string]: any;
  currentUser: Streamer;
  logo: string;
  newPassword: string;
  isLoadingCurrentUser: boolean;
}
