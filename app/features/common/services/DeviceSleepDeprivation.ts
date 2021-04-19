export class DeviceSleepDeprivation {
  /*@ngInject*/
  constructor(private $window : IExtendedWindowService) {
  }

  start() {
    if (this.$window.powerManagement) {
      //this function actually acquires partial lock
      this.$window.powerManagement.dim();
      this.$window.powerManagement.setReleaseOnPause(false);
    }

    if (this.$window.plugins && this.$window.plugins.WifiAdmin) {
      var wifiAdmin = this.$window.plugins.WifiAdmin;
      wifiAdmin.enableWifiLock(true);
    }
  }

  stop() {
    if (this.$window.powerManagement) {
      this.$window.powerManagement.release();
    }

    if (this.$window.plugins && this.$window.plugins.WifiAdmin) {
      var wifiAdmin = this.$window.plugins.WifiAdmin;
      wifiAdmin.enableWifiLock(false);
    }
  }
}
