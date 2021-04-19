import {InAppBrowser} from './InAppBrowser';

class DeviceUtilitiesMock {
  isChromeApp() {
  }

  isWindows() {
  }

  isCordovaSupported() {
  }
}

class NgDialogRouterMock {
  public go(name : string, options : any) {
  }

  public close(name : string) {
  }
}

class $cordovaInAppBrowserMock {
  open(URL, target, options) : void {
    // spy this function..
  }
}

describe('url: InAppBrowser', () => {
  angular.module('LearniApp.url', ['ngLodash'])
    .service('InAppBrowser', InAppBrowser);

  beforeEach(() => {
    angular.mock.module('LearniApp.url');

    angular.mock.module(($provide) : void => {
      $provide.service('$cordovaInAppBrowser', $cordovaInAppBrowserMock);
      $provide.service('DeviceUtilities', DeviceUtilitiesMock);
      $provide.service('ngDialogRouter', NgDialogRouterMock);
    });
  });

  describe('cordova', () => {
    beforeEach(angular.mock.inject((DeviceUtilities : DeviceUtilitiesMock) => {
      spyOn(DeviceUtilities, 'isCordovaSupported').and.returnValue(true);
      spyOn(DeviceUtilities, 'isChromeApp').and.returnValue(false);
      spyOn(DeviceUtilities, 'isWindows').and.returnValue(false);
    }));

    it('should open browser', angular.mock.inject((InAppBrowser : InAppBrowser, $cordovaInAppBrowser : $cordovaInAppBrowserMock) => {
      spyOn($cordovaInAppBrowser, 'open');
      InAppBrowser.open('http://test.com');
      expect($cordovaInAppBrowser.open).toHaveBeenCalled();
    }));
  });

  describe('chrome', () => {
    beforeEach(angular.mock.inject((DeviceUtilities : DeviceUtilitiesMock) => {
      spyOn(DeviceUtilities, 'isCordovaSupported').and.returnValue(false);
      spyOn(DeviceUtilities, 'isChromeApp').and.returnValue(true);
    }));

    it('should open browser', angular.mock.inject((InAppBrowser : InAppBrowser, ngDialogRouter : NgDialogRouterMock) => {
      spyOn(ngDialogRouter, 'go');
      InAppBrowser.open('http://test.com');
      expect(ngDialogRouter.go).toHaveBeenCalledWith('chromeAppBrowser', {
          url: 'http://test.com',
          canClose: true
        },
        true,
        {
          closeByDocument: true,
          closeByEscape: true
        });
    }));

    it('should open browser that can not be closed', angular.mock.inject((InAppBrowser : InAppBrowser, ngDialogRouter : NgDialogRouterMock) => {
      spyOn(ngDialogRouter, 'go');
      InAppBrowser.open('http://test.com', false);
      expect(ngDialogRouter.go).toHaveBeenCalledWith('chromeAppBrowser', {
          url: 'http://test.com',
          canClose: false
        },
        false,
        {
          closeByDocument: false,
          closeByEscape: false
        });
    }));
  });
});
