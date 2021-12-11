import { AxiosPromise } from 'axios';
import { instance } from '.';
import { URLS } from './index';
import {
  Preference,
  PreferenceTypeEnum,
  StreamerPreference,
} from '../model/preference';

export interface BackendPreferences {
  getPreferences(type: PreferenceTypeEnum): AxiosPromise<Preference[]>;
  getStreamerPreferences(
    type: PreferenceTypeEnum
  ): AxiosPromise<StreamerPreference[]>;
  updateStreamerPreferences(
    type: PreferenceTypeEnum,
    preferencesId: string[]
  ): AxiosPromise;
}

export const defaultBackendPreferences: BackendPreferences = {
  getPreferences(type: PreferenceTypeEnum): AxiosPromise<Preference[]> {
    return instance.get<Preference[]>(`${URLS.preferences}/Get/${type}`);
  },

  getStreamerPreferences(
    type: PreferenceTypeEnum
  ): AxiosPromise<StreamerPreference[]> {
    return instance.get<StreamerPreference[]>(
      `${URLS.streamerPreferences}/${type}`
    );
  },

  updateStreamerPreferences(
    type: PreferenceTypeEnum,
    preferencesId: string[]
  ): AxiosPromise {
    return instance.post(`${URLS.streamerPreferences}/${type}`, preferencesId);
  },
};
