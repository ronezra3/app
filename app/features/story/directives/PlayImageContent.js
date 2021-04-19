"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilities_1 = require("../../../3rdparty/common/services/Utilities");
var StoryImageContentController = /** @class */ (function () {
    /*@ngInject*/
    function StoryImageContentController(Activities, Utilities) {
        this.Activities = Activities;
        this.Utilities = Utilities;
    }
    StoryImageContentController.prototype.$onInit = function () {
    };
    StoryImageContentController.prototype.toggleFullScreen = function (event) {
        Utilities_1.Utilities.toggleFullScreen(event.target.parentElement.childNodes[2]);
    };
    return StoryImageContentController;
}());
var template = "\n  <div class='image-container-play' ng-if=\"$ctrl.activity.files\">\n    <img ng-if=\"$ctrl.activity.files[0].fileType.match('^image') != null\" \n      ng-src=\"{{$ctrl.activity.getFilePath(['w_400'])}}\" \n      ng-click=\"$ctrl.toggleFullScreen($event)\"><br />\n    <button class=\"view-full-img-btn\"\n        ng-if=\"$ctrl.activity.files[0].fileType.match('^image') != null\"\n        ng-click=\"$ctrl.toggleFullScreen($event)\">\u05DC\u05D7\u05E5 \u05DC\u05D4\u05D2\u05D3\u05DC\u05EA \u05D4\u05EA\u05DE\u05D5\u05E0\u05D4\n    </button>\n\n    <a ng-if=\"$ctrl.activity.files[0].fileType == 'application/pdf'\" target=\"_blank\" href=\"{{$ctrl.activity.getFilePath([], '.pdf')}}\"><img ng-src=\"{{$ctrl.activity.getFilePath(['w_400'])}}\"></a><br />\n    <a class=\"view-full-img-btn\"  target=\"_blank\" \n        href=\"{{$ctrl.activity.getFilePath([], '.pdf')}}\"\n        ng-if=\"$ctrl.activity.files[0].fileType == 'application/pdf'\">\u05DC\u05D7\u05E5 \u05DC\u05E4\u05EA\u05D9\u05D7\u05EA \u05D4\u05DE\u05E1\u05DE\u05DA\n    </a> \n  </div>\n";
var StoryImageContent = /** @class */ (function () {
    function StoryImageContent() {
        this.controller = StoryImageContentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            isPlaying: '<',
        };
    }
    return StoryImageContent;
}());
exports.StoryImageContent = StoryImageContent;
//# sourceMappingURL=PlayImageContent.js.map