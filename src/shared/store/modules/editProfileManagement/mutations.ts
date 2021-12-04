import { MutationTree } from 'vuex';
import { EditProfileManagementState } from './types';
import { initialState } from './state';
import { Streamer } from '../../../model/user';

export const mutations: MutationTree<EditProfileManagementState> = {
  setProfile(state: EditProfileManagementState, payload: Streamer) {
    state.currentUser = Object.assign({}, payload);
    state.isLoadingCurrentUser = true;
  },
  setNewPassword(state: EditProfileManagementState, payload: string) {
    state.newPassword = payload;
  },
  reset(state) {
    const initState = initialState();
    Object.assign(state, initState);
  },
};
