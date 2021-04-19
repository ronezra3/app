"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IdeasResultsContentController = /** @class */ (function () {
    /*@ngInject*/
    function IdeasResultsContentController(MatchMediaWrapper, Activities) {
        this.Activities = Activities;
        // this.displayCloud = MatchMediaWrapper.isPhone();
    }
    IdeasResultsContentController.prototype.$onInit = function () {
        var _this = this;
        if (!this.activity.associations) {
            this.activity.associations = [];
        }
        this.Activities.onSubmitted('ideas', function (association) {
            _this.activity.associations.push(association);
        });
    };
    return IdeasResultsContentController;
}());
var template = "\n  <activity-header type=\"ideas\" field=\"$ctrl.activity.title\"></activity-header>\n  <div class=\"narow\">\n    <div class=\"resultes-container\"> \n      <label ng-repeat=\"item in $ctrl.activity.associations\">\n        <span ng-class=\"{'with-img': item.file}\">{{item.userName +  \" - \" + item.association}}</span>\n        <div style=\"float:left;\" ng-if=\"item.file\">\n          <img ng-src=\"{{item.file}}\" ng-click=\"showFullImg = !showFullImg\" ng-init=\"showFullImg=false\" />\n          <div class=\"full-img-wrapper\" ng-click=\"showFullImg = !showFullImg\" ng-show=\"showFullImg\"><img ng-src=\"{{item.file}}\"/></div>\n        </div>\n        <div style=\"clear: both;\"></div>\n      </label>\n    </div>\n  </div>\n";
//  <ideas-word-cloud ng-if="!$ctrl.displayCloud" activity="$ctrl.activity" is-playing="$ctrl.isPlaying"></ideas-word-cloud>
//  <most-popular-words ng-if="$ctrl.displayCloud" activity="$ctrl.activity" is-playing="$ctrl.isPlaying"></most-popular-words>
var IdeasResultsContent = /** @class */ (function () {
    function IdeasResultsContent() {
        this.controller = IdeasResultsContentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<',
        };
    }
    return IdeasResultsContent;
}());
exports.IdeasResultsContent = IdeasResultsContent;
//# sourceMappingURL=ResultsContent.js.map