import { EditServiceManagement } from './types';

export const state = (): EditServiceManagement => initialState();

export const initialState = (): EditServiceManagement => ({
  services: [],
  isLoadingServices: false,
});
