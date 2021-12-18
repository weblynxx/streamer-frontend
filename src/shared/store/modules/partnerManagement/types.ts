import { Partner, StreamerPartner } from '@/shared/model/partner';

export interface PartnerManagement {
  [key: string]: any;
  partners: Partner[];
  partnersFood: Partner[];
  partnersClothes: Partner[];
  streamerPartnersFood: StreamerPartner[];
  streamerPartnersClothes: StreamerPartner[];
  totalPartners: number;
  isLoadingPartners: boolean;
}
