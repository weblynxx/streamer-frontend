import { MutationTree } from 'vuex';
import { PreferenceManagement } from './types';
import { initialState } from './state';
import { Preference, StreamerPreference } from '@/shared/model/preference';

export const mutations: MutationTree<PreferenceManagement> = {
  setPreferencesFood(state, payload: Preference[]) {
    state.preferencesFood = payload;
    state.isLoadingPreferences = false;
  },
  setPreferencesClothes(state, payload: Preference[]) {
    state.preferencesClothes = payload;
    state.isLoadingPreferences = false;
  },
  setStreamerPreferenceFood(state, payload: StreamerPreference[]) {
    state.streamerPreferenceFood = payload;
  },
  setStreamerPreferenceClothes(state, payload: StreamerPreference[]) {
    state.streamerPreferenceClothes = payload;
  },
  updateOptions(state, payload: any) {
    state.options = payload;
  },
  setIsLoadingPreferences(state, payload: boolean) {
    state.isLoadingPreferences = payload;
  },
  setTotalPreferences(state, payload: number) {
    state.totalPreferences = payload;
  },
  reset(state) {
    const initState = initialState();
    Object.assign(state, initState);
  },
};
