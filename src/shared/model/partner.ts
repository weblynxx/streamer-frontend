export interface Partner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  authorities: string;
  emailConfirmed: boolean;
  role: string;
  token: string;
  deliveryName: string;
  deliveryType: DeliveryTypeEnum;
}
export const PartnerEmpty: Partner = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
  authorities: '',
  emailConfirmed: false,
  role: '',
  token: '',
  deliveryName: '',
  deliveryType: 0,
};
export type DeliveryTypeEnum = 0 | 1;
export const DeliveryTypeEnum = {
  FOOD: 0 as DeliveryTypeEnum,
  CLOTHES: 1 as DeliveryTypeEnum,
};
export interface Value {
  value: Partner[];
  '@odata.context'?: string | undefined;
  '@odata.count'?: number | undefined;
}
