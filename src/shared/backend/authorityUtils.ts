import store from '../store';
import { User } from '../model/user';

export default class AuthorityUtils {
  public static hasAnyRole(roles: string[]) {
    const user: User = store.getters['authManagement/user'];
    return user && user.authorities != '';
  }
  public static isEmptyAccount() {
    return !store.getters['authManagement/isLoggedIn'];
  }
  public static isLoggedIn() {
    return store.getters['authManagement/isLoggedIn'];
  }
  public static async ensureAccountDetails() {
    if (this.isEmptyAccount()) {
      // wait for account details to be loaded
      await store.dispatch('authManagement/loadAccountDetails');
    }
  }

  public static async getApiInfo() {
    if (!store.getters['apiInfo']) {
      await store.dispatch('load_info');
    }
  }

  public static getAccountId() {
    const id: number = store.getters['authManagement/getAccountId'];
    return id ? id! : null;
  }

  public static getCurrentRole() {
    if (this.isStreamer()) {
      return 'ROLE_STREAMER';
    } else if (this.isCustomer()) {
      return 'ROLE_CUSTOMER';
    }
  }

  public static isStreamer() {
    return store.getters['authManagement/isStreamer'];
  }

  public static isCustomer() {
    return store.getters['authManagement/isCustomer'];
  }
}
