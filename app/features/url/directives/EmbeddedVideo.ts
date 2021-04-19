import IComponentOptions = angular.IComponentOptions;

class EmbeddedVideoController {
  public player : any;
  public preview : any;

  /*@ngInject*/
  constructor(private DeviceUtilities, private $sce) {
  }

  format(videoString) : string {
    // iframes in chromeapp don't support CORS request that's why we are replacing them with webviews
    if (this.DeviceUtilities.isChromeApp()) {
      videoString = videoString.replace('iframe', 'webview');
    }

    // iframes in winjs aren't supported
    // x-ms-webview is only supported in windows 8.1+
    // TODO: if (windows 8) { open video in new window }
    if (this.DeviceUtilities.isWindows()) {
      videoString = videoString.replace('iframe', 'x-ms-webview');
    }

    let videoHtml = angular.element(videoString);

    // in Cordova and chromeapps the src should start with http
    if (this.DeviceUtilities.isCordovaSupported() || this.DeviceUtilities.isChromeApp()) {
      let oldSrc = videoHtml.attr('src');
      videoHtml.attr('src', `http:${oldSrc}`);
    }

    return videoHtml[0].outerHTML;
  }

  $onInit() {
    var x = this.format(this.preview.html);
    var y =  this.$sce.trustAsHtml(x);
    this.player = y;
  }
}

export class EmbeddedVideoComponent implements IComponentOptions {
  public bindings : any = {
    preview: '<'
  };
  public controller : any = EmbeddedVideoController;
  public template : string = `<article ng-bind-html='$ctrl.player' destroy-win-webview></article>`;
}
