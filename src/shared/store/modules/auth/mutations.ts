import { MutationTree } from 'vuex';
import axios from 'axios';
import { AuthState } from './types';
import { initialState } from './state';
import { Streamer } from '../../../model/user';
import { AUTHORITIES } from './index';
import { Credentials } from '../../../model/credentials';
import LSService from '../../../backend/LocalStorageService';

const lsService = LSService.getService();

export const mutations: MutationTree<AuthState> = {
  /**
   * Set the authentication token.
   */
  ['token']: (state: AuthState, token: string) => {
    state.token = token;
    if (token) {
      localStorage.setItem('accessToken', token);
      axios.defaults.headers.common.Authorization = token;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  },
  setAccountId(state: AuthState, id: string) {
    state.error = false;
    state.accountId = id;
  },
  setAccount(state: AuthState, payload: Credentials | undefined) {
    state.error = false;
    state.account = payload;
    if (state.account && state.account.authorities) {
      state.isStreamer = state.account.authorities.includes(
        AUTHORITIES.STREAMER
      );
      state.isCustomer = state.account.authorities.includes(
        AUTHORITIES.CUSTOMER
      );
    }
  },
  setToken(state: AuthState, payload: any) {
    lsService.setToken(payload);
  },
  clearTokens(state: AuthState, payload: any) {
    lsService.clearToken();
  },
  reset(state) {
    const s = initialState();
    Object.keys(s).forEach((key: string) => {
      state[key] = s[key];
    });
  },
  setIsLoggedIn(state, payload: boolean) {
    state.isLoggedIn = payload;
  },
};
