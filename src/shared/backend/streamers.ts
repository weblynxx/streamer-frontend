import { AxiosPromise } from 'axios';
import { instance } from '.';
import { URLS } from './index';
import { Password, Streamer } from '../model/user';

export interface BackendStreamers {
  updateStreamer(user: Streamer): AxiosPromise<Streamer>;
  deleteStreamer(userId: number): AxiosPromise;
  generateNewPassword(userId: number): AxiosPromise;
  isUniqueEmail(email: string): AxiosPromise;
  generateNewStreamerId(): AxiosPromise;
  returnNewPassword(): AxiosPromise<Password>;
}

export const defaultBackendStreamers: BackendStreamers = {
  generateNewStreamerId(): AxiosPromise {
    return instance.get(`${URLS.streamers}/GenerateNewStreamerId`);
  },
  updateStreamer(user: Streamer): AxiosPromise<Streamer> {
    return instance.put<Streamer>(`${URLS.streamers}/${user.id}`, user);
  },
  deleteStreamer(userId: number): AxiosPromise {
    return instance.delete(`${URLS.streamers}/${userId}`);
  },
  generateNewPassword(userId: number): AxiosPromise {
    return instance.post(`${URLS.streamers}/GenerateNewPassword/${userId}`);
  },

  isUniqueEmail(email: string): AxiosPromise {
    return instance.post(`${URLS.streamers}/IsUniqueEmail/${email}`);
  },
  returnNewPassword(): AxiosPromise {
    return instance.post(`${URLS.streamers}/returnNewPassword`);
  },
};
