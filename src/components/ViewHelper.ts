import store from '@/shared/store';

export interface ViewHelper {
  /**
   * Reset input field errors with given validator in defined scope
   *
   * @param {Validator} validator Validator used in current view
   * @param {string} scopeName Name of scope in which the fieldNames reside
   * @param {string[]} fieldNames Names of input fields, which errors will be reset
   */
  // resetErrorFields: (validator: Validator, scopeName: string, fieldNames: string[]) => void;

  /**
   * Shows snackbar on top of the page with given message
   * @param (message) contains the message that will be shown inside the snackbar
   * @param (duration) if given contains the duration how long the snackbar should be shown
   */
  showSnackbarSuccess: (message: string, duration?: number) => void;

  /**
   * Shows snackbar on top of the page with given message
   * @param (message) contains the message that will be shown inside the snackbar
   * @param (duration) if given contains the duration how long the snackbar should be shown
   */
  showSnackbarError: (message: string, duration?: number) => void;
}

export const DefaultViewHelper: ViewHelper = {
  showSnackbarSuccess(message: string, duration?: number) {
    store.commit('showSucess', message, { root: true });
  },
  showSnackbarError(message: string, duration?: number) {
    store.commit('showError', message, { root: true });
  },
};
