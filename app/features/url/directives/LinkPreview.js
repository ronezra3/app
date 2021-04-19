"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkPreviewController = /** @class */ (function () {
    /*@ngInject*/
    function LinkPreviewController(InAppBrowser) {
        this.InAppBrowser = InAppBrowser;
    }
    LinkPreviewController.prototype.open = function () {
        // this.InAppBrowser.open(this.preview.url, this.canClose);
        if (this.preview.type === 'rich') {
            var startIndex = this.preview.html.indexOf('src="//') + 'src="//'.length;
            var lastIndex = this.preview.html.indexOf('schema=google') + 'schema=google'.length;
            var url = this.preview.html.substring(startIndex, lastIndex);
            window.open('http://' + url, '_blank');
        }
        else {
            window.open(this.preview.url, '_blank');
        }
    };
    return LinkPreviewController;
}());
var template = "\n<button ng-click=\"$ctrl.open()\">\n  <article>\n    <header>\n      <h2>{{$ctrl.preview.title}}</h2>\n      <h3>{{$ctrl.preview.url}}</h3>\n    </header>\n\n    <p>{{$ctrl.preview.description}}</p>\n  </article>\n  <aside ng-if=\"$ctrl.preview.thumbnail_url\">\n    <img csp-src=\"{{$ctrl.preview.thumbnail_url}}\"/>\n  </aside>\n</button>\n";
var LinkPreview = /** @class */ (function () {
    function LinkPreview() {
        this.controller = LinkPreviewController;
        this.template = template;
        this.bindings = {
            preview: '<',
            canClose: '<?'
        };
    }
    return LinkPreview;
}());
exports.LinkPreview = LinkPreview;
//# sourceMappingURL=LinkPreview.js.map