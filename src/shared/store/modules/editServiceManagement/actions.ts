import { ActionTree } from 'vuex';
import { EditServiceManagement } from './types';
import { RootState } from '../../types';
import { defaultBackendServices } from '../../../backend/services';
import { initialState } from './state';
import { Service } from '@/shared/model/service';

export const actions: ActionTree<EditServiceManagement, RootState> = {
  async getServices({ commit }) {
    try {
      const services: Service[] = (await defaultBackendServices.getServices())
        .data;
      commit('setServices', services);
    } catch (e) {
      console.log(e);
      commit('setProfile', initialState().employee);
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

  //
  // instance.post<any>(`/api/Service/TwitchLogin`, {
  //   AccessToken: this.$route.query.code,
  // });
  //
};
