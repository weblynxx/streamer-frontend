import { GetterTree } from 'vuex';
import { AuthState } from './types';
import { RootState } from '../../types';

export const getters: GetterTree<AuthState, RootState> = {
  /**
   * Answers whether the user is authenticated (an access token is provided).
   */
  // return a function so it is no cached
  ['token']: (state: AuthState) => () => state.token,
  /**
   * Answers the details of the current employee.
   */
  ['user']: (state: AuthState) => state.account,
  isLoggedIn(state): boolean {
    return null != state.account && state.account.id! != '';
  },
  getUser(state): any {
    return state.account;
  },
  getUserId(state): string | null {
    return state.account ? state.account.id! : null;
  },
  getAccountId(state): string | null {
    return state.accountId ? state.accountId! : null;
  },
  isStreamer(state): boolean {
    return state.isStreamer;
  },
  isAdmin(state): boolean {
    return state.isAdmin;
  },
  isCustomer(state): boolean {
    return state.isCustomer;
  },
};
