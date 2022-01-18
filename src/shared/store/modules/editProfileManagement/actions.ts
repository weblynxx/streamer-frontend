import { ActionTree } from 'vuex';
import { EditProfileManagementState } from './types';
import { RootState } from '../../types';
import AuthorityUtils from '../../../backend/authorityUtils';
import { defaultBackendAccount } from '../../../backend/account';
import { defaultBackendStreamers } from '../../../backend/streamers';
import { Streamer } from '../../../model/user';
import { initialState } from './state';
import i18n from '@/i18n';

export const actions: ActionTree<EditProfileManagementState, RootState> = {
  async getprofile({ commit }) {
    try {
      const accountId = AuthorityUtils.getAccountId();
      const currentEmployee: Streamer = (
        await defaultBackendAccount.getMyAccountWithPassword(accountId!)
      ).data;
      commit('setProfile', currentEmployee);
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

  async generateNewStreamerId({ commit }) {
    try {
      await defaultBackendStreamers.generateNewStreamerId().then(() => {
        commit(
          'setSnackbarSuccess',
          {
            message: i18n.tc(
              `editProfile_management.success.update_streamerId`
            ),
            duration: 5000,
          },
          { root: true }
        );
      });
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(`editProfile_management.error.update_streamerId`),
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async updateStreamerClothesPreferenceText({ commit }, payload: string) {
    try {
      await defaultBackendStreamers
        .updateStreamerClothesPreferenceText(payload)
        .then(response => {
          commit(
            'setSnackbarSuccess',
            {
              message: i18n.tc(
                `preference_management.success.update_food_prefence`
              ),
              duration: 5000,
            },
            { root: true }
          );
        });
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(`preference_management.error.update_food_prefence`),
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async updateStreamerFoodPreferenceText({ commit }, payload: string) {
    try {
      await defaultBackendStreamers
        .updateStreamerFoodPreferenceText(payload)
        .then(response => {
          commit(
            'setSnackbarSuccess',
            {
              message: i18n.tc(
                `preference_management.success.update_food_prefence`
              ),
              duration: 5000,
            },
            { root: true }
          );
        });
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(`preference_management.error.update_food_prefence`),
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async updateStreamerTimeDelivery({ commit }, payload: Streamer) {
    try {
      await defaultBackendStreamers
        .updateStreamerTimeDelivery(payload)
        .then(response => {
          commit(
            'setSnackbarSuccess',
            {
              message: i18n.tc(
                `timeDelivery_management.success.update_time_delivery`
              ),
              duration: 5000,
            },
            { root: true }
          );
        });
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(
            `timeDelivery_management.success.update_time_delivery`
          ),
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async updateStreamerContactData({ commit }, payload: Streamer) {
    try {
      await defaultBackendStreamers
        .updateStreamerContactData(payload)
        .then(response => {
          commit(
            'setSnackbarSuccess',
            {
              message: i18n.tc(
                `editContactData_management.success.update_contact_data`
              ),
              duration: 5000,
            },
            { root: true }
          );
        });
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(
            `editContactData_management.error.update_contact_data`
          ),
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async updateProfile({ commit }, payload: Streamer) {
    try {
      await defaultBackendStreamers.updateStreamer(payload).then(response => {
        commit('setProfile', response.data);
        commit(
          'setSnackbarSuccess',
          {
            message: i18n.tc(`editProfile_management.success.update_profile`),
            duration: 5000,
          },
          { root: true }
        );
      });
    } catch (e) {
      console.log(e);
      commit(
        'setSnackbarError',
        {
          message: i18n.tc(`editProfile_management.error.update_profile`),
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async generateNewPassword({ commit }) {
    return await defaultBackendStreamers.returnNewPassword().then(response => {
      commit('setNewPassword', response.data);
    });
  },
  async uploadLogo({ commit }, payload: { file: any; targetFolder: string }) {
    try {
      const data = new FormData();
      data.append('File', payload.file);
      data.append('TargetFolder', payload.targetFolder);

      //TODO uploading progress
      await defaultBackendStreamers.uploadLogo(data);
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

  async getLogo({ commit }, username?: string) {
    try {
      const logo: string = (await defaultBackendStreamers.getLogo(username))
        .data;
      commit('setLogo', logo);
    } catch (e) {
      console.log(e);
      commit('setLogo', initialState().logo);
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
