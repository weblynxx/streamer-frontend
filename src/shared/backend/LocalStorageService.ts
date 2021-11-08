const LocalStorageService = (function () {
  var _service: any;
  function _getService() {
    if (!_service) {
      _service = LocalStorageService;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj: any) {
    localStorage.setItem("access_token", tokenObj.token.token);
    localStorage.setItem("refresh_token", tokenObj.refreshToken);
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
