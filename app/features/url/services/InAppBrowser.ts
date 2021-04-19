import {ChromeAppBrowserPath} from './../controllers/ChromeAppBrowser';
import {IDialogRouter} from '../../../3rdparty/common/layout/services/NgDialogRouter';
import {IDeviceUtilities} from '../../../3rdparty/common/services/DeviceUtilities';

export interface IBrowser {
  open(url, canClose?);
  close();
}

export class InAppBrowser implements IBrowser {
  /*@ngInject*/
  constructor(private DeviceUtilities : IDeviceUtilities, private $cordovaInAppBrowser : any, private ngDialogRouter : IDialogRouter) {
  }

  open(url, canClose = true) {
    // if (this.DeviceUtilities.isChromeApp()) {
    //   this.ngDialogRouter.go(ChromeAppBrowserPath, {
    //       url: url,
    //       canClose: canClose
    //     },
    //     canClose,
    //     {
    //       closeByDocument: canClose,
    //       closeByEscape: canClose
    //     });
    // } else {
    //   this.$cordovaInAppBrowser.open(url, '_blank', {
    //     location: canClose && this.DeviceUtilities.isWindows() ? 'yes' : 'no'
    //   });
    // }
  }

  close() {
    // if (this.DeviceUtilities.isChromeApp()) {
    //   this.ngDialogRouter.close(ChromeAppBrowserPath);
    // } else {
    //   this.$cordovaInAppBrowser.close();
    // }
  }
}
