import { LinkedServices, Service } from '@/shared/model/service';

export interface EditServiceManagement {
  [key: string]: any;
  services: Service[];
  linkedServices: LinkedServices[];
  isLoadingServices: boolean;
}
