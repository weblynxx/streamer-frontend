import { PublicStreamerEmpty } from '@/shared/model/publicStreamer';
import { PublicStreamerManagementState } from './types';

export const state = (): PublicStreamerManagementState => initialState();

export const initialState = (): PublicStreamerManagementState => ({
  streamer: {
    ...PublicStreamerEmpty,
  },
});
