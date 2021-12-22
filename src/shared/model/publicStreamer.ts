import { Partner } from './partner';
import { StreamerPreference } from './preference';

export interface PublicStreamer {
  firstName: string;
  lastName: string;
  userName: string;
  streamerId: string;
  from: string;
  to: string;
  isStoppedDelivery: boolean;
  foodPreferenceText: string;
  clothesPreferenceText: string;
  preferencesFood: StreamerPreference[];
  preferencesClothes: StreamerPreference[];
  partnersFood: Partner[];
  partnersClothes: Partner[];
}

export interface PublicStreamerServices {}
export const PublicStreamerEmpty: PublicStreamer = {
  firstName: '',
  lastName: '',
  userName: '',
  streamerId: '',
  from: '',
  to: '',
  isStoppedDelivery: false,
  foodPreferenceText: '',
  clothesPreferenceText: '',
  preferencesFood: [],
  preferencesClothes: [],
  partnersFood: [],
  partnersClothes: [],
};
