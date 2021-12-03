import Vue from 'vue';
import Vuex, { ActionTree, GetterTree, MutationTree, StoreOptions } from 'vuex';
import { Snackbar } from '../model/snackbar';
import { RootState } from './types';
import { authManagement } from './modules/auth';
import { editProfileManagement } from './modules/editProfileManagement';
import { editServiceManagement } from './modules/editServiceManagement';
import { partnerManagement } from './modules/partnerManagement';

import i18n from '../../i18n';

import createPersistedState from 'vuex-persistedstate';
import { instance } from '../backend';

Vue.config.devtools = true;
Vue.use(Vuex);

export const actions: ActionTree<State, RootState> = {
  ['load_info']: ({ commit }) => {
    instance.get<any>('/api/users/info').then(value => {
      if (value && value.data) {
        commit('set_info', value.data);
      }
    });
  },
  setLocale({ commit }) {
    i18n.locale = localStorage.getItem('locale')!;
    commit('set_currentLanguage', i18n.locale);
  },
  async releaseSnackbar({ commit }) {
    commit('setSnackbarVisibility', false);
  },
  setRowsPerPage({ commit }, rows: number) {
    commit('setRowsPerPage', rows);
  },

  resetAllState({ commit }) {
    temp.forEach((moduleName: any) => {
      commit(`${moduleName}/reset`);
    });
  },
};

var temp = ['authManagement'];

export const mutations: MutationTree<State> = {
  showError: (s: State, payload: any) => {
    s.snackbar.show = true;
    s.snackbar.color = 'error';
    s.snackbar.text = payload;
    s.snackbar.duration = 5000;
  },
  showSuccess: (s: State, payload: any) => {
    s.snackbar.show = true;
    s.snackbar.color = 'success';
    s.snackbar.text = payload;
    s.snackbar.duration = 5000;
  },
  setSnackbarError: (s: State, payload: any) => {
    s.snackbar.show = true;
    s.snackbar.color = 'error';
    s.snackbar.text = payload.message;
    s.snackbar.duration = payload.duration;
  },
  ['set_currentLanguage']: (s: State, currentLanguage: string) => {
    s.currentLanguage = currentLanguage;
  },
  setSnackbarSuccess: (s: State, payload: any) => {
    s.snackbar.show = true;
    s.snackbar.color = 'success';
    s.snackbar.text = payload.message;
    s.snackbar.duration = payload.duration;
  },
  setSnackbarVisibility: (s: State, visibility: boolean) => {
    s.snackbar.show = visibility;
  },
  ['set_info']: (s: State, info: any) => {
    s.apiInfo = info;
  },
};

export const getters: GetterTree<State, RootState> = {
  ['info']: (s: State) => s.apiInfo,
  ['currentLanguage']: (s: State) => s.currentLanguage,
};

export interface State {
  apiInfo: string | null;
  snackbar: Snackbar;
  currentLanguage: string;
}
export const state = (): State => ({
  apiInfo: null,
  snackbar: {
    show: false,
    color: '',
    text: '',
    duration: 5000,
  },
  currentLanguage: '',
});

const storeOptions: StoreOptions<RootState> = {
  state: state() as any,
  getters,
  mutations,
  actions,
  modules: {
    authManagement,
    editProfileManagement,
    editServiceManagement,
    partnerManagement,
  },
  plugins: [],
};

const store = new Vuex.Store<RootState>(storeOptions);
export default store;
