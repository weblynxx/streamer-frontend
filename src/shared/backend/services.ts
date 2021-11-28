import { AxiosPromise } from 'axios';
import { instance } from '.';
import { URLS } from './index';
import { Password, User } from '../model/user';
import { LinkedServices, Service } from '../model/service';

export interface BackendServices {
  getServices(): AxiosPromise<Service[]>;
  getLinkedServices(): AxiosPromise<LinkedServices[]>;
}

export const defaultBackendServices: BackendServices = {
  getServices(): AxiosPromise<Service[]> {
    return instance.get<Service[]>(`${URLS.services}/Get`);
  },
  getLinkedServices(): AxiosPromise<LinkedServices[]> {
    return instance.get<LinkedServices[]>(`${URLS.services}/GetLinkedServices`);
  },
};
