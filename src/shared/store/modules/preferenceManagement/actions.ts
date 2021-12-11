import { ActionTree } from 'vuex';
import { PreferenceManagement } from './types';
import { RootState } from '../../types';
import { defaultBackendPreferences } from '../../../backend/preferences';
import { initialState } from './state';
import { PreferenceTypeEnum } from '@/shared/model/preference';

export const actions: ActionTree<PreferenceManagement, RootState> = {
  async getPreferencesFood({ commit, dispatch }) {
    try {
      commit('setIsLoadingPreferences', true);
      const response = await defaultBackendPreferences.getPreferences(
        PreferenceTypeEnum.FOOD
      );
      commit('setTotalPreferences', response.data.length);
      commit('setPreferencesFood', response.data);
    } catch (e) {
      commit('setPreferencesFood', []);
      commit('setIsLoadingPreferences', false);
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
  async getPreferencesClothes({ commit, dispatch }) {
    try {
      commit('setIsLoadingPreferences', true);
      const response = await defaultBackendPreferences.getPreferences(
        PreferenceTypeEnum.CLOTHES
      );
      commit('setTotalPreferences', response.data.length);
      commit('setPreferencesClothes', response.data);
    } catch (e) {
      commit('setPreferencesClothes', []);
      commit('setIsLoadingPreferences', false);
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
  async getStreamerPreferencesFood({ commit, dispatch }) {
    try {
      const response = await defaultBackendPreferences.getStreamerPreferences(
        PreferenceTypeEnum.FOOD
      );
      commit('setStreamerPreferenceFood', response.data);
    } catch (e) {
      commit('setPreferencesFood', []);
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
  async getStreamerPreferencesClothes({ commit, dispatch }) {
    try {
      const response = await defaultBackendPreferences.getStreamerPreferences(
        PreferenceTypeEnum.CLOTHES
      );
      commit('setStreamerPreferenceClothes', response.data);
    } catch (e) {
      commit('setStreamerPreferenceClothes', []);
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
  async updateStreamerPreferencesFood(
    { commit, dispatch },
    preferencesIds: string[]
  ) {
    try {
      const response = await defaultBackendPreferences.updateStreamerPreferences(
        PreferenceTypeEnum.FOOD,
        preferencesIds
      );
      commit('setStreamerPreferenceFood', response.data);
    } catch (e) {
      commit('setStreamerPreferenceFood', []);
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
  async updateStreamerPreferencesClothes(
    { commit, dispatch },
    preferencesIds: string[]
  ) {
    try {
      const response = await defaultBackendPreferences.updateStreamerPreferences(
        PreferenceTypeEnum.CLOTHES,
        preferencesIds
      );
      commit('setStreamerPreferenceClothes', response.data);
    } catch (e) {
      commit('setStreamerPreferenceClothes', []);
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
};
