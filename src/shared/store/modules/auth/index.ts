import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AuthState } from './types';
import { RootState } from '../../types';
import { state } from './state';

const namespaced: boolean = true;

export const authManagement: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export enum AUTHORITIES {
  STREAMER = 'ROLE_STREAMER',
  CUSTOMER = 'ROLE_CUSTOMER',
  ADMIN = 'ROLE_ADMIN',
}
