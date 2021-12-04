import { Streamer } from "../../../model/user";
import { Credentials } from "../../../model/credentials";

export interface AuthState {
  [key: string]: any;
  token?: string;
  account?: Credentials | null;
  accountId?: string;
  isLoggedIn: boolean;
  error: boolean;
  isStreamer: boolean;
  isCustomer: boolean;
}
