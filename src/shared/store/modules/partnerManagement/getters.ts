import { GetterTree } from 'vuex';
import { PartnerManagement } from './types';
import { RootState } from '../../types';
import { Partner, StreamerPartner } from '@/shared/model/partner';

export const getters: GetterTree<PartnerManagement, RootState> = {
  getPartners(state): Partner[] {
    return state.partners;
  },
  getPartnersFood(state): Partner[] {
    return state.partnersFood;
  },
  getPartnersClothes(state): Partner[] {
    return state.partnersClothes;
  },
  getStreamerPartnersFood(state): StreamerPartner[] {
    return state.streamerPartnersFood;
  },
  getStreamerPartnersClothes(state): StreamerPartner[] {
    return state.streamerPartnersClothes;
  },
};
