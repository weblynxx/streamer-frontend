import axios from 'axios';
import router from '../../router';
import store from '../store';
import LSService from './LocalStorageService';

const lsService = LSService.getService();

export const instance = axios.create({
  baseURL: process.env.VUE_STREAMER_BACKEND_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: any) => {
    const token = lsService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    store.dispatch('authManagement/logout');
    router.push({ name: 'login', params: { checkLogin: 'false' } });
  }
);
/**
 * Global error handler.
 */
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    const refreshToken = lsService.getRefreshToken();
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      const token = lsService.getAccessToken();
      return axios
        .post(
          '/api/users/refreshtoken',
          {
            refreshToken: refreshToken,
            accessToken: token,
          },
          {
            headers: {
              'Content-Type': 'application/json', // TODO: test if need this header (backend was set up to use JSON) + the same for `checkPasswordReset` action
            },
          }
        )
        .then(res => {
          if (res.status === 201 || res.status == 200) {
            lsService.setToken(res.data);
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + lsService.getAccessToken();
            return axios(originalRequest);
          }

          return Promise.reject(error);
        });
    }
    throw error;
  }
);

export enum URLS {
  customersOData = '/odata/Customers',
  customers = '/api/Customers',

  authenticate = '/api/Users/login',
  account = '/api/Users',

  streamersDtoOData = '/odata/StreamerDto',
  streamers = '/api/Streamers',

  servicesDtoOData = '/odata/ServiceDto',
  services = '/api/Service',

  partnersOData = '/odata/Partners',
  partners = '/api/Partners',
}

export enum URL_PARAMS {
  orderby = '$orderby',
  top = '$top',
  skip = '$skip',
  count = '$count',

  nameContains = '$filter',
  filterClause = '$filter',
}
