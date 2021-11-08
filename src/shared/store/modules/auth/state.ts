import { AuthState } from "./types";

export const state = (): AuthState => initialState();

export const initialState = (): AuthState => ({
  token: undefined,
  account: null,
  accountId: undefined,
  isLoggedIn: false,
  error: false,
  isStreamer: false,
  isCustomer: false,
});
