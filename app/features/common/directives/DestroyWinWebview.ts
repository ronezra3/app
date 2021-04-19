/*@ngInject*/
export function DestroyWinWebview(DeviceUtilities : any) {

  return {
    restrict: 'A',
    priorty: 1001,
    link: (scope : any, elem : any, attrs : any) => {
      /*
       x-ms-webview have a well known bug that when detaching from DOM it not really destroyed,
       so if you're sharing a video and close this view the video will keep on playing in the background!
       I need a reference to the x-ms-webview DOM element so I can execute "navigateToString" that "stops" the music.
       http://stackoverflow.com/questions/22478887/winjs-unload-x-ms-webview-when-user-navigates-away-from-the-page
       */
      if (!DeviceUtilities.isWindows()) {
        return;
      }

      var x_ms_webview : any;
      var unwatch = scope.$watch(attrs.ngBindHtml, () => {
        x_ms_webview = document.getElementsByTagName('x-ms-webview')[0];
      });

      scope.$on('$destroy', () => {
        x_ms_webview.navigateToString('');
        unwatch();
      });
    }
  };
}
