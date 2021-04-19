"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlResultsContentController = /** @class */ (function () {
    /*@ngInject*/
    function UrlResultsContentController(MatchMediaWrapper, Activities) {
        this.Activities = Activities;
        // this.displayCloud = MatchMediaWrapper.isPhone();    
    }
    UrlResultsContentController.prototype.$onInit = function () {
        var _this = this;
        if (!this.activity.sumarizeActivity.associations) {
            this.activity.sumarizeActivity.associations = [];
        }
        this.activity.sumarizeActivity.attendedCount = this.activity.attendedCount;
        this.Activities.onSubmitted('url', function (association) {
            _this.activity.sumarizeActivity.associations.push(association);
        });
    };
    return UrlResultsContentController;
}());
//<span style="font-weight: 700;">{{$index + 1 +  '.' }} {{item.association}}</span>
var template = "\n<activity-header type=\"ideas\" field=\"$ctrl.activity.sumarizeActivity.title\"></activity-header>\n<div class=\"narow\">\n  <div class=\"resultes-container\"> \n    <label ng-repeat=\"item in $ctrl.activity.sumarizeActivity.associations\">\n      <span ng-class=\"{'with-img': item.file}\">{{item.userName +  \" - \" + item.association}}</span>\n      <div style=\"float:left;\" ng-if=\"item.file\">\n        <img ng-src=\"{{item.file}}\" ng-click=\"showFullImg = !showFullImg\" ng-init=\"showFullImg=false\" />\n        <div class=\"full-img-wrapper\" ng-click=\"showFullImg = !showFullImg\" ng-show=\"showFullImg\"><img ng-src=\"{{item.file}}\"/></div>\n      </div>\n      <div style=\"clear: both;\"></div>          \n    </label>\n  </div>\n</div>\n";
// <activity-header type="url" field="$ctrl.activity.actualUrl">
// {{ 'url-results-title' | translate : {type: $ctrl.activity.preview.type} }}
// </activity-header>
// <embedded-url class="narrow" preview="$ctrl.activity"></embedded-url>
var UrlResultsContent = /** @class */ (function () {
    function UrlResultsContent() {
        this.template = template;
        this.controller = UrlResultsContentController;
        this.bindings = {
            activity: '<',
            isPlaying: '<',
        };
    }
    return UrlResultsContent;
}());
exports.UrlResultsContent = UrlResultsContent;
//# sourceMappingURL=ResultsContent.js.map