"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoryResultsContentController = /** @class */ (function () {
    /*@ngInject*/
    function StoryResultsContentController(MatchMediaWrapper, Activities) {
        this.Activities = Activities;
    }
    StoryResultsContentController.prototype.$onInit = function () {
    };
    return StoryResultsContentController;
}());
var template = "\n  <div class='image-container-view'>\n    <img ng-if=\"$ctrl.activity.files[0].fileType.match('^image') != null\" \n         ng-src=\"{{$ctrl.activity.getFilePath(['w_400'])}}\" \n         ng-click=\"$ctrl.toggleFullScreen($event)\">\n    <a ng-if=\"$ctrl.activity.files[0].fileType == 'application/pdf'\" target=\"_blank\" href=\"{{$ctrl.activity.getFilePath([], '.pdf')}}\">\n      <img ng-src=\"{{$ctrl.activity.getFilePath(['w_400'])}}\">\n    </a>  \n  </div>\n";
var StoryResultsContent = /** @class */ (function () {
    function StoryResultsContent() {
        this.controller = StoryResultsContentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<',
        };
    }
    return StoryResultsContent;
}());
exports.StoryResultsContent = StoryResultsContent;
//# sourceMappingURL=ResultsContent.js.map