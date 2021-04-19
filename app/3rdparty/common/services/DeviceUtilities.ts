declare var chrome : any;
declare var cordova : any;

export interface IDeviceUtilities {
  isChromeApp() : boolean;
  isCordovaSupported() : boolean;
  isAndroid() : boolean;
  isIOS(): boolean;
  isWindows() : boolean;
  isVersionLargerThan(version : number) : boolean;
}

class DeviceUtilities implements IDeviceUtilities {
  constructor(private $cordovaDevice) {
  }

  isChromeApp() {
    return false;
    // return (typeof(chrome) !== 'undefined' && typeof(chrome.app.runtime) !== 'undefined') && !this.isCordovaSupported();
  }

  isCordovaSupported() {
    return typeof(cordova) !== 'undefined';
  }

  isAndroid() {
    return this.isPlatform('Android');
  }

  isIOS() {
    return this.isPlatform('iOS');
  }

  isWindows() {
    return this.isPlatform('windows');
  }

  isVersionLargerThan(version) {
    return this.isCordovaSupported() && parseFloat(this.$cordovaDevice.getVersion()) > version;
  }

  private isPlatform(platform) {
    return this.isCordovaSupported() && this.$cordovaDevice.getPlatform() === platform;
  }
}
class DeviceUtilitiesService extends DeviceUtilities {
  constructor(private $document, $cordovaDevice) {
    super($cordovaDevice);
  }

  hideKeyboard() {
    this.$document[0].activeElement.blur();
    var inputs = this.$document[0].querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].blur();
    }
  }

  disableBackSpace() {
    var backSpaceKeyNumber = 8;
    document.addEventListener('keydown', function (event) {
      if ((event.target['localName'] !== 'input'
        && event.target['localName'] !== 'textarea')
        && event.which === backSpaceKeyNumber) {
        event.preventDefault();
      }
    });
  }
}

export class DeviceUtilitiesProvider extends DeviceUtilities {

  /*@ngInject*/
  constructor($cordovaDeviceProvider) {
    super($cordovaDeviceProvider.$get());
  }

  /*@ngInject*/
  public $get($document, $cordovaDevice) {
    return new DeviceUtilitiesService($document, $cordovaDevice);
  }
}

