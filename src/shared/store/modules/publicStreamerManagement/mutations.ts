import { MutationTree } from 'vuex';
import { PublicStreamerManagementState } from './types';
import { initialState } from './state';
import { PublicStreamer } from '@/shared/model/publicStreamer';

export const mutations: MutationTree<PublicStreamerManagementState> = {
  setStreamer(state: PublicStreamerManagementState, payload: PublicStreamer) {
    state.streamer = Object.assign({}, payload);
  },
  reset(state) {
    const initState = initialState();
    Object.assign(state, initState);
  },
};
