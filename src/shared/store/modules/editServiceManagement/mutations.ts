import { MutationTree } from 'vuex';
import { EditServiceManagement } from './types';
import { initialState } from './state';
import { LinkedServices, Service } from '@/shared/model/service';

export const mutations: MutationTree<EditServiceManagement> = {
  setServices(state, payload: Service[]) {
    state.services = payload;
  },
  setLinkedServices(state, payload: LinkedServices[]) {
    state.linkedServices = payload;
  },
  reset(state) {
    const initState = initialState();
    Object.assign(state, initState);
  },
};
