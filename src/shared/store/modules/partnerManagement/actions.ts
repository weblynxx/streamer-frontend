import { ActionTree } from 'vuex';
import { PartnerManagement } from './types';
import { RootState } from '../../types';
import { defaultBackendPartners } from '../../../backend/partners';
import { initialState } from './state';
import { DeliveryTypeEnum, Partner } from '@/shared/model/partner';
import i18n from '@/i18n';

export const actions: ActionTree<PartnerManagement, RootState> = {
  async getPartnersFood({ commit, dispatch }) {
    try {
      const response = await defaultBackendPartners.getPartnersByType(
        DeliveryTypeEnum.FOOD
      );
      console.log(response.data);
      commit('setPartnersFood', response.data);
    } catch (e) {
      commit('setPartnersFood', []);
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
  async getStreamerPartnersFood({ commit, dispatch }) {
    try {
      const response = await defaultBackendPartners.getStreamerPartners(
        DeliveryTypeEnum.FOOD
      );
      commit('setStreamerPartnersFood', response.data);
    } catch (e) {
      commit('setStreamerPartnersFood', []);
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
  async getStreamerPartnersClothes({ commit, dispatch }) {
    try {
      const response = await defaultBackendPartners.getStreamerPartners(
        DeliveryTypeEnum.CLOTHES
      );
      commit('setStreamerPartnersClothes', response.data);
    } catch (e) {
      commit('setStreamerPartnersClothes', []);
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
  async updateStreamerRestuarants(
    { commit, dispatch },
    preferencesIds: string[]
  ) {
    try {
      const response = await defaultBackendPartners.updateStreamerPartners(
        DeliveryTypeEnum.FOOD,
        preferencesIds
      );
    } catch (e) {
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
  async updateStreamerClothesShop(
    { commit, dispatch },
    preferencesIds: string[]
  ) {
    try {
      const response = await defaultBackendPartners.updateStreamerPartners(
        DeliveryTypeEnum.CLOTHES,
        preferencesIds
      );
      commit('setPartnersClothes', response.data);
    } catch (e) {
      commit('setPartnersClothes', []);
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
  async getPartnersClothes({ commit, dispatch }) {
    try {
      const response = await defaultBackendPartners.getPartnersByType(
        DeliveryTypeEnum.CLOTHES
      );
      commit('setPartnersClothes', response.data);
    } catch (e) {
      commit('setPartnersClothes', []);
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
  async uploadImage({ commit }, payload: { file: any; targetFolder: string }) {
    try {
      const data = new FormData();
      data.append('File', payload.file);
      data.append('TargetFolder', payload.targetFolder);

      //TODO uploading progress
      await defaultBackendPartners.uploadImage(data);
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(`error.load_data_failed`),
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
