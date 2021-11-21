import { AxiosPromise } from 'axios';
import { instance } from '.';
import { URLS } from './index';
import { Password, User } from '../model/user';
import { Service } from '../model/service';

export interface BackendServices {
  getServices(): AxiosPromise<Service[]>;
}

export const defaultBackendServices: BackendServices = {
  getServices(): AxiosPromise<Service[]> {
    return instance.get<Service[]>(`${URLS.services}/Get`);
  },
};
