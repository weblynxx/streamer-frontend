import { GetterTree } from 'vuex';
import { PublicStreamerManagementState } from './types';
import { RootState } from '../../types';
import { PublicStreamer } from '@/shared/model/publicStreamer';

export const getters: GetterTree<PublicStreamerManagementState, RootState> = {
  getStreamer(state): PublicStreamer | undefined {
    return state.streamer;
  },
};
