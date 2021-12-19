import { ActionTree } from 'vuex';
import { AuthState } from './types';
import { RootState } from '../../types';
import { defaultBackendAccount } from '../../../backend/account'; //TODO @/shared/backend/account
import { Credentials } from '../../../model/credentials';
import { Streamer } from '../../../model/user';
import store from '../..';
import { Logger } from 'fsts';

const logger = new Logger('actions');
export const actions: ActionTree<AuthState, RootState> = {
  /**
   * Login to the backend.
   */
  async login({ commit, dispatch }, payload: Credentials) {
    // authenticate to get the access token
    return defaultBackendAccount
      .authenticate(payload.username!, payload.password!, payload.rememberMe)
      .then(response => {
        commit('setIsLoggedIn', true);
        commit('setToken', response.data);
        commit('setAccountId', response.data.userId);
        return response;
      })
      .catch(e => {
        logger.error(e);
        throw e;
      });
  },

  async passwordForgotten({ commit, dispatch }, email: string) {
    try {
      const status = (await defaultBackendAccount.initResetPassword(email))
        .status;
    } catch (e) {
      commit(
        'setSnackbarError',
        {
          message: 'Error when reset password',
          duration: 5000,
        },
        { root: true }
      );
    }
  },
  async checkIsStreamerExist({ commit }, userName: string) {
    let result = await defaultBackendAccount.checkIsStreamerExist(userName);
    return result;
  },
  async loadAccountDetails({ commit }, id?: number) {
    return defaultBackendAccount
      .getMyAccount()
      .then(result => {
        commit('setAccount', result.data.account);
        commit('setAccountId', result.data.account.id);
        //success('auth.acc_load.success', commit)
      })
      .catch(e => {
        commit('setAccount', undefined);
      });
  },
  /**
   * Clears the access token, effectively logging out the user.
   */
  logout({ commit }) {
    return defaultBackendAccount.logout().then(result => {
      commit('setIsLoggedIn', false);
      commit('setAccount', undefined);
      commit('setAccountId', null);
      commit('clearTokens');
      store.dispatch('resetAllState');
      return result;
    });
  },
  createStreamer({ commit, dispatch }, payload: any) {
    return defaultBackendAccount
      .createStreamer(payload)
      .then(response => {
        commit(
          'setSnackbarSuccess',
          {
            message: 'Streamer cretaed succesfully!',
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
            message: 'Error when create streamer',
            duration: 5000,
          },
          { root: true }
        );
      });
  },
};
