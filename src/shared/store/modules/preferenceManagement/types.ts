import { Preference, StreamerPreference } from '@/shared/model/preference';

export interface PreferenceManagement {
  [key: string]: any;
  preferencesFood: Preference[];
  preferencesClothes: Preference[];
  streamerPreferenceFood: StreamerPreference[];
  streamerPreferenceClothes: StreamerPreference[];
  totalPreferences: number;
  isLoadingPreferences: boolean;
}
