export interface Service {
  id: string;
  name: string;
}
export interface LinkedServices {
  serviceName: string;
  userName: string;
}

export const ServiceEmpty: Service = {
  id: '',
  name: '',
};
