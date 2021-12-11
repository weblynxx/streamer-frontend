import { GetterTree } from 'vuex';
import { PreferenceManagement } from './types';
import { RootState } from '../../types';
import { Preference, StreamerPreference } from '@/shared/model/preference';

export const getters: GetterTree<PreferenceManagement, RootState> = {
  getPreferencesFood(state): Preference[] {
    return state.preferencesFood;
  },
  getPreferencesClothes(state): Preference[] {
    return state.preferencesClothes;
  },
  getStreamerPreferencesFood(state): StreamerPreference[] {
    return state.streamerPreferenceFood;
  },
  getStreamerPreferencesClothes(state): StreamerPreference[] {
    return state.streamerPreferenceClothes;
  },
};
