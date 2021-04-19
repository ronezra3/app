/*global cordova, module*/

module.exports = {
  getAppOnTop: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "Appontop", "getAppOnTop", []);
  },
  hasPermission: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "PackageUsageStats", "hasPermission", []);
  },
  requestPermission: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "PackageUsageStats", "requestPermission", []);
  }
};
