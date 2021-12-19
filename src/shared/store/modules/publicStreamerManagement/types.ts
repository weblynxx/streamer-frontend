import { PublicStreamer } from '@/shared/model/publicStreamer';

export interface PublicStreamerManagementState {
  [key: string]: any;
  streamer: PublicStreamer;
}
