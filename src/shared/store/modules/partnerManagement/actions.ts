import { ActionTree } from 'vuex';
import { PartnerManagement } from './types';
import { RootState } from '../../types';
import { defaultBackendPartners } from '../../../backend/partners';
import { initialState } from './state';
import { Partner } from '@/shared/model/partner';

export const actions: ActionTree<PartnerManagement, RootState> = {
  async getPartners({ commit, dispatch }, payload?: any) {
    try {
      commit('setIsLoadingPartners', true);
      const response = await defaultBackendPartners.getPartners(payload);
      commit('setTotalPartners', response.data['@odata.count']);
      commit('setPartners', response.data.value);
    } catch (e) {
      commit('setPartners', []);
      commit('setIsLoadingPartners', false);
      commit(
        'setSnackbarError',
        {
          message: 'Error',
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async updateOptions({ commit, dispatch }, payload?: any) {
    try {
      commit('updateOptions', payload);
    } catch (e) {
      console.log(e);
    }
  },
  async createPartner({ commit, dispatch }, payload: any) {
    return await defaultBackendPartners
      .createPartner(payload)
      .then(response => {
        commit(
          'setSnackbarSuccess',
          {
            message: 'Partner cretaed succesfully!',
            duration: 5000,
          },
          { root: true }
        );
      })
      .catch(error => {
        console.log(error);
        if (error.response.data) {
          throw error.response.data;
        }
        commit(
          'setSnackbarError',
          {
            message: 'Error when create parnter',
            duration: 5000,
          },
          { root: true }
        );
      });
  },

  //
  // instance.post<any>(`/api/Service/TwitchLogin`, {
  //   AccessToken: this.$route.query.code,
  // });
  //
};
