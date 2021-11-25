import { Service } from '@/shared/model/service';

export interface EditServiceManagement {
  [key: string]: any;
  services: Service[];
  isLoadingServices: boolean;
}
