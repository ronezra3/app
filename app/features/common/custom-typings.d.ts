interface IExtendedWindowService extends angular.IWindowService {
  powerManagement: any;
  plugins: any;
}

declare var WinJS : any;

interface IAppontop {
  getAppOnTop(successCallback, errorCallback) : void;
  hasPermission(successCallback, errorCallback) : void;
  requestPermission(successCallback, errorCallback) : void;
}

declare var appontop : IAppontop;

