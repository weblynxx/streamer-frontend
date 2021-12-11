import { PreferenceManagement } from './types';

export const state = (): PreferenceManagement => initialState();

export const initialState = (): PreferenceManagement => ({
  preferencesFood: [],
  preferencesClothes: [],
  streamerPreferenceFood: [],
  streamerPreferenceClothes: [],
  isLoadingPreferences: false,
  totalPreferences: 0,
});
