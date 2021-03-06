import { GetterTree } from 'vuex';
import { PartnerManagement } from './types';
import { RootState } from '../../types';
import { Partner } from '@/shared/model/partner';

export const getters: GetterTree<PartnerManagement, RootState> = {
  getPartners(state): Partner[] {
    return state.partners;
  },
};
