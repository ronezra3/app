"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedBrowserController = /** @class */ (function () {
    /*@ngInject*/
    function EmbeddedBrowserController($sce, Url, ENV) {
        this.$sce = $sce;
        this.Url = Url;
        this.proxyEndpoint = ENV.proxyEndpoint;
    }
    EmbeddedBrowserController.prototype.upadate = function (preview) {
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
    };
    return EmbeddedBrowserController;
}());
var EmbeddedBrowser = /** @class */ (function () {
    function EmbeddedBrowser() {
        this.bindings = {
            preview: '='
        };
        this.controller = EmbeddedBrowserController;
        this.template = "<url-preview preview=\"$ctrl.preview.preview\"></url-preview>";
        // public template: string = `<iframe class="embedly-embed" ng-src="{{$ctrl.upadate($ctrl.preview)}}" width="854" height="480"></iframe>`;
        // public template: string = "<div></div>"
    }
    return EmbeddedBrowser;
}());
exports.EmbeddedBrowser = EmbeddedBrowser;
//# sourceMappingURL=EmbeddedBrowser.js.map