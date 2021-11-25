import { GetterTree } from 'vuex';
import { EditServiceManagement } from './types';
import { RootState } from '../../types';
import { Service } from '@/shared/model/service';

export const getters: GetterTree<EditServiceManagement, RootState> = {
  getServices(state): Service[] {
    return state.services;
  },
};
