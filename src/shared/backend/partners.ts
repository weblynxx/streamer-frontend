import { AxiosPromise } from 'axios';
import { instance } from '.';
import { URLS } from './index';
import { Partner, Value } from '../model/partner';
import { DefaultBackendHelper } from './backendHelper';

export interface BackendPartners {
  createPartner: (payload: any) => AxiosPromise<Partner>;
  getPartners: (searchParams: any) => AxiosPromise<Value>;
  uploadImage(payload: any): AxiosPromise<any>;
}

export const defaultBackendPartners: BackendPartners = {
  uploadImage(payload: any): AxiosPromise<any> {
    return instance.post<any>(`${URLS.partners}/UploadImage`, payload);
  },
  getPartners(searchParams?: any): AxiosPromise<Value> {
    let url = '';
    if (searchParams) {
      let params: string[] = DefaultBackendHelper.addPagingParams(
        [],
        searchParams.page,
        searchParams.rowsPerPage
      );
      params = DefaultBackendHelper.addSortingParams(params, searchParams.sort);

      const searcheableColumns: Map<string, string> = new Map([
        ['name', 'Name'],
      ]);

      let constructedQury = '';
      if (searchParams.nameContains) {
        if (searchParams.nameContains.includes(':')) {
          let fieldName = searchParams.nameContains.split(':')[0];
          let fieldNameTranslated = searcheableColumns.get(
            fieldName.toLowerCase()
          );
          let searchedValue: string = searchParams.nameContains.split(':')[1];
          constructedQury +=
            DefaultBackendHelper.returnSql(constructedQury) +
            '(' +
            'contains(tolower(' +
            fieldNameTranslated +
            "),'" +
            searchedValue +
            "'))";
        } else {
          constructedQury +=
            DefaultBackendHelper.returnSql(constructedQury) +
            '(' +
            "contains(tolower(DeliveryName), '" +
            searchParams.nameContains.toLowerCase() +
            "')" +
            searchParams.nameContains.toLowerCase() +
            "'))";
        }
      }
      if (constructedQury) {
        params.push(constructedQury);
      }

      url = DefaultBackendHelper.addParamsToUrl(
        `${URLS.partnersOData}`,
        params
      );
    } else {
      url = `${URLS.partnersOData}`;
    }
    return instance.get<Value>(url);
  },
  createPartner(payload: Partner): AxiosPromise<Partner> {
    let newPartner = payload;
    let deliveryType = payload.deliveryType;
    let deliveryName = payload.deliveryName;
    return instance.post<Partner>(
      `${URLS.partners}/CreatePartner/${deliveryType}`,
      {
        FirstName: deliveryName,
        LastName: deliveryName,
        Email: newPartner.email,
        UserName: newPartner.userName,
        Password: newPartner.password,
        Authorities: 'ROLE_PARTNER',
      }
    );
  },
};
