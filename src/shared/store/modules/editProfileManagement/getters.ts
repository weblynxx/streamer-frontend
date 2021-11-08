import { GetterTree } from 'vuex';
import { EditProfileManagementState } from './types';
import { RootState } from '../../types';
import { User } from '../../../model/user';

export const getters: GetterTree<EditProfileManagementState, RootState> = {
  getProfile(state): User | undefined {
    return state.currentEmployee;
  },
};
