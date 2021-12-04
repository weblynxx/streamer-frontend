import { GetterTree } from 'vuex';
import { EditServiceManagement } from './types';
import { RootState } from '../../types';
import { LinkedServices, Service } from '@/shared/model/service';

export const getters: GetterTree<EditServiceManagement, RootState> = {
  getServices(state): Service[] {
    return state.services;
  },
  getLinkedServices(state): LinkedServices[] {
    return state.linkedServices;
  },
};
