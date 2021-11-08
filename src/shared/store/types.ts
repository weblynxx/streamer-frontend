import { Snackbar } from '../model/snackbar';

export interface RootState {
  apiInfo: string | null;
  snackbar: Snackbar;
}
