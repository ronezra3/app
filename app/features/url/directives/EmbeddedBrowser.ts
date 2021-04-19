import IComponentOptions = angular.IComponentOptions;
import ISCEService = angular.ISCEService;

class EmbeddedBrowserController {
  public preview: any;
  proxyEndpoint;
  public url: any
  /*@ngInject*/
  constructor(private $sce: ISCEService, private Url, ENV) {
    this.proxyEndpoint = ENV.proxyEndpoint;
  }

  upadate(preview) {

    //   if (this.preview.actualUrl.includes('drive.google') || this.preview.actualUrl.includes('docs.google')
    //     || this.preview.actualUrl.includes('sheets.google')) {
    //     const url = this.$sce.trustAsResourceUrl(this.preview.actualUrl);
    //     return url;
    //   }

    //   const path = this.proxyEndpoint + "/?target=" + this.preview.actualUrl
    //   const url = this.$sce.trustAsResourceUrl(path);
    //   return url;
    // }
    return preview.actualUrl;
  }
}

export class EmbeddedBrowser implements IComponentOptions {
  public bindings: any = {
    preview: '='
  };
  public controller: any = EmbeddedBrowserController;

  public template: string = `<url-preview preview="$ctrl.preview.preview"></url-preview>`;
  // public template: string = `<iframe class="embedly-embed" ng-src="{{$ctrl.upadate($ctrl.preview)}}" width="854" height="480"></iframe>`;
  // public template: string = "<div></div>"
}

