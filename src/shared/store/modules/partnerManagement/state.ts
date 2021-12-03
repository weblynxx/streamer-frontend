import { PartnerManagement } from './types';

export const state = (): PartnerManagement => initialState();

export const initialState = (): PartnerManagement => ({
  partners: [],
  totalPartners: 0,
  isLoadingPartners: false,
  options: {
    itemsPerPage: 10,
    sortBy: ['deliveryName'],
    sortDesc: [false],
  },
});
