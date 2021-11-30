import { GetterTree } from 'vuex';
import { EditProfileManagementState } from './types';
import { RootState } from '../../types';
import { Streamer } from '../../../model/user';

export const getters: GetterTree<EditProfileManagementState, RootState> = {
  getProfile(state): Streamer | undefined {
    return state.currentEmployee;
  },
};
