export interface Preference {
  id: string;
  name: string;
  type: PreferenceTypeEnum;
}

export const PreferenceEmpty: Preference = {
  id: '',
  name: '',
  type: 0,
};

export interface StreamerPreference {
  id: string;
  streamerId: string;
  preferenceId: string;
}

export const StreamerPreferenceEmpty: StreamerPreference = {
  id: '',
  streamerId: '',
  preferenceId: '',
};

export type PreferenceTypeEnum = 0 | 1;
export const PreferenceTypeEnum = {
  FOOD: 0 as PreferenceTypeEnum,
  CLOTHES: 1 as PreferenceTypeEnum,
};
