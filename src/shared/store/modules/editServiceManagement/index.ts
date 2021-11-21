import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { EditServiceManagement } from './types';
import { RootState } from '../../types';
import { state } from './state';

const namespaced: boolean = true;

export const editServiceManagement: Module<EditServiceManagement, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
