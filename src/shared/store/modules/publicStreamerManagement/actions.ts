import { ActionTree } from 'vuex';
import { PublicStreamerManagementState } from './types';
import { RootState } from '../../types';
import AuthorityUtils from '../../../backend/authorityUtils';
import { defaultBackendAccount } from '../../../backend/account';
import { defaultBackendStreamers } from '../../../backend/streamers';
import { Streamer } from '../../../model/user';
import { initialState } from './state';
import i18n from '@/i18n';
import { PublicStreamer } from '@/shared/model/publicStreamer';

export const actions: ActionTree<PublicStreamerManagementState, RootState> = {
  async getPublicStreamer({ commit }, userName: string) {
    try {
      const publicStreamer: PublicStreamer = (
        await defaultBackendAccount.getPublicStreamer(userName)
      ).data;
      commit('setStreamer', publicStreamer);
    } catch (e) {
      console.log(e);
      commit('setStreamer', initialState().streamer);
      commit(
        'setSnackbarError',
        {
          message: `error.load_data_failed`,
          duration: 5000,
        },
        { root: true }
      );
    }
  },
};
