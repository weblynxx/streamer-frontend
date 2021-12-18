import { MutationTree } from 'vuex';
import { PartnerManagement } from './types';
import { initialState } from './state';
import { Partner } from '@/shared/model/partner';

export const mutations: MutationTree<PartnerManagement> = {
  setPartners(state, payload: Partner[]) {
    state.partners = payload;
    state.isLoadingPartners = false;
  },
  setPartnersFood(state, payload: Partner[]) {
    state.partnersFood = payload;
  },
  setPartnersClothes(state, payload: Partner[]) {
    state.partnersClothes = payload;
  },
  updateOptions(state, payload: any) {
    state.options = payload;
  },
  setIsLoadingPartners(state, payload: boolean) {
    state.isLoadingPartners = payload;
  },
  setTotalPartners(state, payload: number) {
    state.totalPartners = payload;
  },
  reset(state) {
    const initState = initialState();
    Object.assign(state, initState);
  },
};
