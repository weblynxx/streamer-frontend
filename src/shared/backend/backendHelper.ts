/**
 * Container to collect helper functions for backends
 */
import { URL_PARAMS } from '.';

export interface BackendHelper {
  /**
   * Append given parameter to given URL
   *
   * @param {string} url URL to append parameter to
   * @param {string[]} params List of parameter to be appended to URL
   */
  addParamsToUrl: (url: string, params: string[]) => string;
  /**
   * Add paging parameter to URL parameter list.
   * If `page` or `pageSize` is omitted, default values will be assumed.
   *
   * @param {string[]} params Existing URL parameter list
   * @param {string} top Index of page to be returned
   * @param {string} skip Size of page to be returned
   */
  addPagingParams: (params: string[], top?: number, skip?: number) => string[];
  /**
   * Add sorting parameter to URL parameter list
   *
   * @param {string[]} params Existing URL parameter list
   * @param {string[]} sorting List of parameters to be treated as sorting queries
   */
  addSortingParams: (params: string[], ...sorting: string[]) => string[];

  returnSql: (source: string) => string;
}

export const DefaultBackendHelper: BackendHelper = {
  addParamsToUrl(url: string, params: string[]) {
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    return url;
  },

  addPagingParams(params: string[], top?: number, skip?: number) {
    if (top === undefined || isNaN(top)) {
      top = Number(process.env.VUE_APP_PAGING_PAGE_INDEX_DEFAULT);
    }
    params.push(URL_PARAMS.top + '=' + top);
    if (skip === undefined || isNaN(skip)) {
      skip = Number(process.env.VUE_APP_PAGING_PAGE_SIZE_DEFAULT);
    }
    params.push(URL_PARAMS.skip + '=' + skip);
    return params;
  },

  addSortingParams(params: string[], ...sorting: string[]) {
    if (sorting && sorting.length > 0) {
      for (const sort of sorting) {
        params.push(URL_PARAMS.orderby + '=' + sort);
      }
    }
    params.push(URL_PARAMS.count + '=' + 'true');
    return params;
  },

  returnSql(source: string) {
    if (source === '') {
      source = URL_PARAMS.filterClause + '=';
    } else {
      source = ' AND ';
    }
    return source;
  },
};
