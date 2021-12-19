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
}
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
};
