/*@ngInject*/
export function WindowsConfig ($httpProvider, DeviceUtilitiesProvider) {
  document.addEventListener('deviceready', () => {
    if (DeviceUtilitiesProvider.isWindows()) {
      WinJS.Application.addEventListener('error', (err) => {
        console.log(err);
      });
    }

    /**
     * Windows webview cache GET request automatically.
     */
    if (DeviceUtilitiesProvider.isWindows()) {
      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }

      $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

      $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
  }, false);
}
