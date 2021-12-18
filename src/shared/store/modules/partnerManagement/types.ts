import { Partner } from '@/shared/model/partner';

export interface PartnerManagement {
  [key: string]: any;
  partners: Partner[];
  partnersFood: Partner[];
  partnersClothes: Partner[];
  totalPartners: number;
  isLoadingPartners: boolean;
}
